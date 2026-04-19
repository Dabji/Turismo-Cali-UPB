#!/bin/bash
# ============================================================
# Script de Backup — Base de Datos MySQL + Configuraciones Críticas
# Turismo Cali — Consorcio "Ruta 7 Ríos"
# Infraestructura WAN Corporativa — Track 2
# ============================================================
# HU-71: Respaldo de base de datos y configuraciones críticas
#
# Este script realiza:
#   1. Dump completo de la base de datos MySQL (comprimido .sql.gz)
#   2. Respaldo de configuraciones de Nginx (/etc/nginx/)
#   3. Respaldo de configuraciones del proyecto (infraestructura/)
#
# Todos los archivos se almacenan con timestamp para trazabilidad.
#
# Uso: ./backup_db.sh
# Cron recomendado: 0 2 * * * /ruta/al/backup_db.sh >> /var/log/backup_db.log 2>&1
# ============================================================

set -euo pipefail

# ========== CONFIGURACIÓN ==========
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-3306}"
DB_USER="${DB_USER:-turismo_user}"
DB_PASSWORD="${DB_PASSWORD:-}"
DB_NAME="${DB_NAME:-turismo_cali_db}"

# Directorio raíz de backups
BACKUP_ROOT="/var/backups/turismocali"
BACKUP_DIR_DB="${BACKUP_ROOT}/mysql"
BACKUP_DIR_CONFIGS="${BACKUP_ROOT}/configs"
RETENTION_DAYS=30
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

# Archivos de backup con timestamp
BACKUP_FILE_DB="${BACKUP_DIR_DB}/${DB_NAME}_backup_${DATE}.sql.gz"
BACKUP_FILE_NGINX="${BACKUP_DIR_CONFIGS}/nginx_config_${DATE}.tar.gz"
BACKUP_FILE_PROJECT="${BACKUP_DIR_CONFIGS}/project_config_${DATE}.tar.gz"

LOG_FILE="/var/log/backup_db.log"

# Rutas de configuraciones a respaldar
# HU-71: Respaldo de configuraciones críticas del servidor y del proyecto
NGINX_CONFIG_DIR="/etc/nginx"
PROJECT_CONFIG_DIR="${PROJECT_CONFIG_DIR:-/var/www/turismocali/infraestructura}"

# ========== COLORES PARA OUTPUT ==========
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# ========== FUNCIONES ==========
log_info() {
    echo -e "${GREEN}[INFO]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $(date '+%Y-%m-%d %H:%M:%S') - $1"
}

# ========== VERIFICACIONES PREVIAS ==========
log_info "========================================="
log_info "  INICIANDO BACKUP COMPLETO"
log_info "  Fecha: $DATE"
log_info "========================================="

# Verificar que las herramientas necesarias están instaladas
for cmd in mysqldump gzip tar; do
    if ! command -v "$cmd" &> /dev/null; then
        log_error "$cmd no está instalado. Abortando."
        exit 1
    fi
done

# Crear directorios de backup si no existen
for dir in "$BACKUP_DIR_DB" "$BACKUP_DIR_CONFIGS"; do
    if [ ! -d "$dir" ]; then
        log_info "Creando directorio de backup: $dir"
        mkdir -p "$dir"
        chmod 700 "$dir"
    fi
done

# ============================================================
# FASE 1: BACKUP DE BASE DE DATOS MYSQL
# Cumplimiento: Respaldo del almacén de datos principal
# ============================================================
log_info ""
log_info "--- FASE 1: Backup de Base de Datos ---"
log_info "Base de datos: $DB_NAME"
log_info "Servidor: $DB_HOST:$DB_PORT"
log_info "Archivo destino: $BACKUP_FILE_DB"

SECONDS=0

# Desactivar errexit temporalmente para capturar el estado del pipeline
set +e
mysqldump \
    --host="$DB_HOST" \
    --port="$DB_PORT" \
    --user="$DB_USER" \
    --password="$DB_PASSWORD" \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    --add-drop-table \
    --complete-insert \
    --extended-insert \
    --quick \
    --lock-tables=false \
    "$DB_NAME" | gzip > "$BACKUP_FILE_DB"

BACKUP_DB_STATUS=${PIPESTATUS[0]}
GZIP_STATUS=${PIPESTATUS[1]}
set -e

DB_DURATION=$SECONDS

if [ $BACKUP_DB_STATUS -eq 0 ] && [ $GZIP_STATUS -eq 0 ]; then
    BACKUP_DB_SIZE=$(du -h "$BACKUP_FILE_DB" | cut -f1)
    log_info "Backup de BD completado exitosamente."
    log_info "Tamaño: $BACKUP_DB_SIZE | Duración: ${DB_DURATION}s"
    chmod 600 "$BACKUP_FILE_DB"
else
    log_error "Error al realizar el backup de BD (mysqldump=$BACKUP_DB_STATUS, gzip=$GZIP_STATUS)."
    [ -f "$BACKUP_FILE_DB" ] && rm -f "$BACKUP_FILE_DB"
    exit 1
fi

# Verificar integridad del dump
log_info "Verificando integridad del backup de BD..."
if gzip -t "$BACKUP_FILE_DB" 2>/dev/null; then
    log_info "Verificación de integridad BD: OK"
else
    log_error "El archivo de backup de BD está corrupto."
    exit 1
fi

# ============================================================
# FASE 2: BACKUP DE CONFIGURACIÓN DE NGINX
# HU-71: Respaldo de configuraciones críticas — Nginx
# Incluye: sites-available, sites-enabled, nginx.conf, conf.d/
# ============================================================
log_info ""
log_info "--- FASE 2: Backup de Configuración Nginx ---"

if [ -d "$NGINX_CONFIG_DIR" ]; then
    log_info "Respaldando $NGINX_CONFIG_DIR → $BACKUP_FILE_NGINX"

    if tar -czf "$BACKUP_FILE_NGINX" \
        -C / \
        "$(echo "$NGINX_CONFIG_DIR" | sed 's|^/||')" \
        2>/dev/null; then
        BACKUP_NGINX_SIZE=$(du -h "$BACKUP_FILE_NGINX" | cut -f1)
        log_info "Backup de Nginx completado. Tamaño: $BACKUP_NGINX_SIZE"
        chmod 600 "$BACKUP_FILE_NGINX"
    else
        log_warn "Error al comprimir configuración de Nginx. Continuando..."
        [ -f "$BACKUP_FILE_NGINX" ] && rm -f "$BACKUP_FILE_NGINX"
    fi
else
    log_warn "Directorio $NGINX_CONFIG_DIR no encontrado. Omitiendo backup de Nginx."
fi

# ============================================================
# FASE 3: BACKUP DE CONFIGURACIONES DEL PROYECTO
# HU-71: Respaldo de configuraciones críticas — Proyecto
# Incluye: nginx.conf del proyecto, backup_db.sh, .env.example,
#          prisma/schema.prisma, y otros archivos de configuración
# ============================================================
log_info ""
log_info "--- FASE 3: Backup de Configuraciones del Proyecto ---"

if [ -d "$PROJECT_CONFIG_DIR" ]; then
    log_info "Respaldando $PROJECT_CONFIG_DIR → $BACKUP_FILE_PROJECT"

    if tar -czf "$BACKUP_FILE_PROJECT" \
        -C "$(dirname "$PROJECT_CONFIG_DIR")" \
        "$(basename "$PROJECT_CONFIG_DIR")" \
        2>/dev/null; then
        BACKUP_PROJECT_SIZE=$(du -h "$BACKUP_FILE_PROJECT" | cut -f1)
        log_info "Backup de configuraciones del proyecto completado. Tamaño: $BACKUP_PROJECT_SIZE"
        chmod 600 "$BACKUP_FILE_PROJECT"
    else
        log_warn "Error al comprimir configuraciones del proyecto. Continuando..."
        [ -f "$BACKUP_FILE_PROJECT" ] && rm -f "$BACKUP_FILE_PROJECT"
    fi
else
    log_warn "Directorio $PROJECT_CONFIG_DIR no encontrado. Omitiendo backup de proyecto."
fi

# ============================================================
# LIMPIEZA DE BACKUPS ANTIGUOS
# Aplica a todos los tipos de backup (BD + configs)
# ============================================================
log_info ""
log_info "--- Limpieza de backups antiguos (>$RETENTION_DAYS días) ---"

DELETED_DB=$(find "$BACKUP_DIR_DB" -name "*.sql.gz" -type f -mtime +$RETENTION_DAYS -print -delete 2>/dev/null | wc -l)
DELETED_CONFIGS=$(find "$BACKUP_DIR_CONFIGS" -name "*.tar.gz" -type f -mtime +$RETENTION_DAYS -print -delete 2>/dev/null | wc -l)
DELETED_TOTAL=$((DELETED_DB + DELETED_CONFIGS))

if [ "$DELETED_TOTAL" -gt 0 ]; then
    log_info "Se eliminaron $DELETED_TOTAL backup(s) antiguo(s) ($DELETED_DB BD + $DELETED_CONFIGS configs)."
else
    log_info "No hay backups antiguos para eliminar."
fi

# ============================================================
# RESUMEN FINAL
# ============================================================
TOTAL_DB_BACKUPS=$(find "$BACKUP_DIR_DB" -name "*.sql.gz" -type f 2>/dev/null | wc -l)
TOTAL_CONFIG_BACKUPS=$(find "$BACKUP_DIR_CONFIGS" -name "*.tar.gz" -type f 2>/dev/null | wc -l)
TOTAL_SIZE=$(du -sh "$BACKUP_ROOT" 2>/dev/null | cut -f1)

log_info ""
log_info "========================================="
log_info "  RESUMEN DE BACKUP COMPLETO"
log_info "========================================="
log_info "  Fecha         : $DATE"
log_info "  Base de datos : $DB_NAME"
log_info "  Dump BD       : $(basename "$BACKUP_FILE_DB") ($BACKUP_DB_SIZE)"
if [ -f "$BACKUP_FILE_NGINX" ]; then
    log_info "  Config Nginx  : $(basename "$BACKUP_FILE_NGINX") (${BACKUP_NGINX_SIZE:-desconocido})"
else
    log_info "  Config Nginx  : omitido"
fi
if [ -f "$BACKUP_FILE_PROJECT" ]; then
    log_info "  Config Proy.  : $(basename "$BACKUP_FILE_PROJECT") (${BACKUP_PROJECT_SIZE:-desconocido})"
else
    log_info "  Config Proy.  : omitido"
fi
log_info "  Duración BD   : ${DB_DURATION} segundos"
log_info "  Total BD      : $TOTAL_DB_BACKUPS backup(s)"
log_info "  Total Configs : $TOTAL_CONFIG_BACKUPS backup(s)"
log_info "  Espacio total : $TOTAL_SIZE"
log_info "  Retención     : $RETENTION_DAYS días"
log_info "========================================="
log_info "Proceso de backup finalizado correctamente."

#!/bin/bash
# ============================================================
# Script de Backup — Base de Datos MySQL
# Turismo Cali — Infraestructura WAN Corporativa
# ============================================================
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

BACKUP_DIR="/var/backups/mysql/turismocali"
RETENTION_DAYS=30
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_backup_${DATE}.sql.gz"
LOG_FILE="/var/log/backup_db.log"

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
log_info "Iniciando proceso de backup de la base de datos..."

# Verificar que mysqldump está instalado
if ! command -v mysqldump &> /dev/null; then
    log_error "mysqldump no está instalado. Abortando."
    exit 1
fi

# Verificar que gzip está instalado
if ! command -v gzip &> /dev/null; then
    log_error "gzip no está instalado. Abortando."
    exit 1
fi

# Crear directorio de backup si no existe
if [ ! -d "$BACKUP_DIR" ]; then
    log_info "Creando directorio de backup: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
    chmod 700 "$BACKUP_DIR"
fi

# ========== EJECUTAR BACKUP ==========
log_info "Base de datos: $DB_NAME"
log_info "Servidor: $DB_HOST:$DB_PORT"
log_info "Archivo destino: $BACKUP_FILE"

SECONDS=0

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
    "$DB_NAME" | gzip > "$BACKUP_FILE"

BACKUP_STATUS=$?
DURATION=$SECONDS

if [ $BACKUP_STATUS -eq 0 ]; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    log_info "Backup completado exitosamente."
    log_info "Tamaño: $BACKUP_SIZE | Duración: ${DURATION}s"
    chmod 600 "$BACKUP_FILE"
else
    log_error "Error al realizar el backup (código: $BACKUP_STATUS)."
    # Eliminar archivo incompleto
    [ -f "$BACKUP_FILE" ] && rm -f "$BACKUP_FILE"
    exit 1
fi

# ========== VERIFICAR INTEGRIDAD ==========
log_info "Verificando integridad del backup..."

if gzip -t "$BACKUP_FILE" 2>/dev/null; then
    log_info "Verificación de integridad: OK"
else
    log_error "El archivo de backup está corrupto."
    exit 1
fi

# ========== LIMPIEZA DE BACKUPS ANTIGUOS ==========
log_info "Eliminando backups con más de $RETENTION_DAYS días..."

DELETED_COUNT=$(find "$BACKUP_DIR" -name "*.sql.gz" -type f -mtime +$RETENTION_DAYS -print -delete | wc -l)

if [ "$DELETED_COUNT" -gt 0 ]; then
    log_info "Se eliminaron $DELETED_COUNT backup(s) antiguo(s)."
else
    log_info "No hay backups antiguos para eliminar."
fi

# ========== RESUMEN ==========
TOTAL_BACKUPS=$(find "$BACKUP_DIR" -name "*.sql.gz" -type f | wc -l)
TOTAL_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)

log_info "========================================="
log_info "  RESUMEN DE BACKUP"
log_info "========================================="
log_info "  Base de datos : $DB_NAME"
log_info "  Archivo       : $(basename "$BACKUP_FILE")"
log_info "  Tamaño        : $BACKUP_SIZE"
log_info "  Duración      : ${DURATION} segundos"
log_info "  Total backups : $TOTAL_BACKUPS"
log_info "  Espacio total : $TOTAL_SIZE"
log_info "  Retención     : $RETENTION_DAYS días"
log_info "========================================="
log_info "Proceso de backup finalizado correctamente."

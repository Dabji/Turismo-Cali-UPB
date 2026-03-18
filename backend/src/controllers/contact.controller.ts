import { Request, Response } from 'express';
import prisma from '../config/database';
import { logger } from '../services/logger.service';

export class ContactController {
  /**
   * POST /api/contact (público)
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, phone, subject, message } = req.body;

      if (!name || !email || !subject || !message) {
        res.status(400).json({ error: 'Nombre, email, asunto y mensaje son requeridos' });
        return;
      }

      const contact = await prisma.contactMessage.create({
        data: { name, email, phone, subject, message },
      });

      logger.info(`Nuevo mensaje de contacto de: ${name} (${email})`);
      res.status(201).json({ message: 'Mensaje enviado correctamente', contact });
    } catch (error) {
      logger.error('Error creando mensaje de contacto:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * GET /api/contact (admin)
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.json({ messages });
    } catch (error) {
      logger.error('Error obteniendo mensajes:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * PATCH /api/contact/:id/read (admin)
   */
  async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await prisma.contactMessage.update({
        where: { id: parseInt(id, 10) },
        data: { isRead: true },
      });
      res.json({ message: 'Marcado como leído' });
    } catch (error) {
      logger.error('Error marcando mensaje como leído:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export const contactController = new ContactController();

import { Request, Response } from 'express';
import prisma from '../config/database';
import { logger } from '../services/logger.service';

export class TourismController {
  /**
   * GET /api/tourism/services
   * Lista todos los servicios turísticos activos (público).
   */
  async getServices(req: Request, res: Response): Promise<void> {
    try {
      const { category, search } = req.query;

      const where: any = { isActive: true };
      if (category) where.category = category as string;
      if (search) {
        where.OR = [
          { title: { contains: search as string } },
          { description: { contains: search as string } },
        ];
      }

      const services = await prisma.tourService.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      });

      res.json({ services });
    } catch (error) {
      logger.error('Error obteniendo servicios turísticos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * GET /api/tourism/services/:id
   */
  async getServiceById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const service = await prisma.tourService.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!service) {
        res.status(404).json({ error: 'Servicio no encontrado' });
        return;
      }

      res.json({ service });
    } catch (error) {
      logger.error('Error obteniendo servicio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * POST /api/tourism/services (admin)
   */
  async createService(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, price, duration, imageUrl, category } = req.body;

      if (!title || !description || !price || !duration || !category) {
        res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
        return;
      }

      const service = await prisma.tourService.create({
        data: { title, description, price: parseFloat(price), duration, imageUrl, category },
      });

      res.status(201).json({ service });
    } catch (error) {
      logger.error('Error creando servicio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * PUT /api/tourism/services/:id (admin)
   */
  async updateService(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      const service = await prisma.tourService.update({
        where: { id: parseInt(id, 10) },
        data,
      });

      res.json({ service });
    } catch (error) {
      logger.error('Error actualizando servicio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  /**
   * DELETE /api/tourism/services/:id (admin) — soft delete
   */
  async deleteService(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await prisma.tourService.update({
        where: { id: parseInt(id, 10) },
        data: { isActive: false },
      });

      res.json({ message: 'Servicio desactivado correctamente' });
    } catch (error) {
      logger.error('Error eliminando servicio:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export const tourismController = new TourismController();

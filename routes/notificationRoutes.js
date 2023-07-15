import express from 'express';
import {
  getAllNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controller/NotificationController.js';
import { authenticateToken } from '../utils/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllNotifications);
router.post('/', authenticateToken, createNotification);
router.put('/:id', authenticateToken, updateNotification);
router.delete('/:id', authenticateToken, deleteNotification);

export default router;

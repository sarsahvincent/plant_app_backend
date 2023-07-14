import express from 'express';
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/order.controller';
import { authenticateToken } from '../utils/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllOrders);
router.post('/', authenticateToken, createOrder);
router.put('/:id', authenticateToken, updateOrder);
router.delete('/:id', authenticateToken, deleteOrder);

export default router;

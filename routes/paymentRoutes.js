import express from 'express';
import {
  getAllPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from '../controller/paymentController.js';
import { authenticateToken } from '../utils/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllPayments);
router.post('/', authenticateToken, createPayment);
router.put('/:id', authenticateToken, updatePayment);
router.delete('/:id', authenticateToken, deletePayment);

export default router;

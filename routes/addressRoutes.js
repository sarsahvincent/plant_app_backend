import express from 'express';
import {
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/address.controller';
import { authenticateToken } from '../utils/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllAddresses);
router.post('/', authenticateToken, createAddress);
router.put('/:id', authenticateToken, updateAddress);
router.delete('/:id', authenticateToken, deleteAddress);

export default router;

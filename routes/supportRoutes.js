import express from 'express';
import {
  getAllSupportRequests,
  createSupportRequest,
  updateSupportRequest,
  deleteSupportRequest,
} from '../controller/supportController.js';
import { authenticateToken } from '../utils/auth';

const router = express.Router();

router.get('/', authenticateToken, getAllSupportRequests);
router.post('/', authenticateToken, createSupportRequest);
router.put('/:id', authenticateToken, updateSupportRequest);
router.delete('/:id', authenticateToken, deleteSupportRequest);

export default router;

// app/modules/protected-routes.ts
import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// This route is protected and requires JWT token
router.get('/profile', authenticate, (req: AuthRequest, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      }
    }
  });
});

// Another protected route example
router.get('/dashboard', authenticate, (req: AuthRequest, res) => {
  res.status(200).json({
    status: 'success',
    message: `Welcome to dashboard, ${req.user.name}!`,
    data: {
      user: req.user
    }
  });
});

export default router;
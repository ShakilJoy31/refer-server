// app/modules/refer-server-routes.ts
import express from 'express';
import { login, signup } from './authentication/authentication.controller';
import protectedRoutes from './protected-routes';

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes (require JWT token)
router.use(protectedRoutes);

export default router;
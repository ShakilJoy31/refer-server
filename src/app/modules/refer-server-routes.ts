// app/modules/refer-server-routes.ts
import express from 'express';
import { getUserByIdController, login, signup, updateUserController } from './authentication/authentication.controller';
import protectedRoutes from './protected-routes';
import { purchase } from './refer/refer.controller';
import { getUserDashboardById } from './dashboard/dashboard.controller';

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user-by-id", getUserByIdController);
router.put("/update-user-by-id/:id", updateUserController); 




// Refer
router.put("/purchase-book", purchase);

// Fetching dashboard data
router.get("/get-user-refer", getUserDashboardById);

// Protected routes (require JWT token)
router.use(protectedRoutes);

export default router;
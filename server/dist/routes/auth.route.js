import { signup, login, logout } from "../controller/auth.controller.js";
import { authMiddleware, getCurrenrUser } from '../middleware/auth.middleware.js';
import express from 'express';
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/getme', authMiddleware, getCurrenrUser);
export default router;
//# sourceMappingURL=auth.route.js.map
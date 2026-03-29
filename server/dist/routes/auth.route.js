import { signup, login, logout } from "../controller/auth.controller.js";
import express from 'express';
const router = express.Router();
router.post('/signup', signup);
export default router;
//# sourceMappingURL=auth.route.js.map
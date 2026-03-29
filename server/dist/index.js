import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
import { prisma } from './lib/prisma.js';
import authroutes from '../src/routes/auth.route.js';
const PORT = 3000;
const app = express();
app.get('/', (req, res) => {
    res.send("Proboat Started");
});
app.use(express.json());
app.use('/api/auth', authroutes);
app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});
//# sourceMappingURL=index.js.map
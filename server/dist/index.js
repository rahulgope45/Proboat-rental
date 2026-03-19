import dotenv from 'dotenv';
dotenv.config();
import express, {} from 'express';
const PORT = 3000;
const app = express();
app.get('/', (req, res) => {
    res.send("Proboat Started");
});
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
});
//# sourceMappingURL=index.js.map
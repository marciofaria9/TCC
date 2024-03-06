import express, {Request, Response, NextFunction} from "express";
import { router } from "./routes";

const app = express();
app.use(express.json());

app.use(router);
const port = 3333;

app.listen(port,() => console.log(`Server On Port ${port}`))

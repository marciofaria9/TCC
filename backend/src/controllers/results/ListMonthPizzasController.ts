import { Request, Response } from "express";
import { ListMonthPizzasService } from "../../services/results/ListMonthPizzasService";


class ListMonthPizzasController {

 async handle (req: Request, res: Response) {

    const listMonthPizzasService = new ListMonthPizzasService();

    const orders = await listMonthPizzasService.execute();

    return res.json(orders);
 }

}

export { ListMonthPizzasController }
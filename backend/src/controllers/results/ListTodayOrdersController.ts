import { Request, Response } from "express";
import { ListTodayOrdersService } from "../../services/results/ListTodayOrdersService";


class ListTodayOrdersController {

  async handle(req: Request, res: Response) {
    
    const listTodayOrdersService = new ListTodayOrdersService();

    const orders = await listTodayOrdersService.execute();
    
    return res.json(orders);
    
  }
}

export { ListTodayOrdersController };

import prismaClient from "../../prisma";
import { startOfMonth, endOfMonth } from 'date-fns';

class ListMonthPizzasService {

    async execute() {

        const currentDate = new Date();
        const startDate = startOfMonth(currentDate);
        const endDate = endOfMonth(currentDate);
   
        const orders = await prismaClient.item.findMany({
            where: {
                created_at: {
                    gte: startDate,
                    lte: endDate,
                },
                product: {
                    category_id: '16d3df6c-f07c-4fd1-818b-6f64d1f10272',
                },
            },
            include: {
                product: true,
            },
        });

        const itemCounts: { [itemName: string]: number } = {};

        orders.forEach((order) => {
            const productName = order.product.name;
            itemCounts[productName] = (itemCounts[productName] || 0) + order.amount;
        });

        return itemCounts;
    }
}

export { ListMonthPizzasService }

import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string;
    product_id: string;
    amount: number;
    observation: string
}

class AddItemService {
    async execute({ order_id, product_id, amount, observation }: ItemRequest) {

        const order = await prismaClient.item.create({
            data: {
                order_id: order_id,
                product_id: product_id,
                amount: amount,
                observation: observation
            }

        })

        return order;
    }
}

export { AddItemService }
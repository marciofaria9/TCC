import { empty } from "@prisma/client/runtime/library";
import prismaClient from "../../prisma";


interface ProductRequest {
    category_id: string;
}


class ListByCategoryService {
    async execute({ category_id }: ProductRequest) {


        if (!category_id) {
            throw new Error('No cateogry informed')
        }

        const findByCategory = await prismaClient.product.findMany({
            where: {
                category_id: category_id // igual a categoria recebida como parametro
            }

        })
        return findByCategory;
    }
}

export { ListByCategoryService }
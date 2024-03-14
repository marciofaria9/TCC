import prismaClient from "../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {

        if (name === '') {
            throw new Error('invalid name')
        }

        // se já existir a categoria da erro
        const categoryAlreadyExist = await prismaClient.category.findFirst({
            where: {
                name: name
            }
        })

        if (categoryAlreadyExist) {
            throw new Error("category already exist")
        }

        const category = await prismaClient.category.create({
            data: {
                name: name,
            },
            select: {
                id: true,
                name: true
            }
        })
        return category
    }
}

export { CreateCategoryService }
import prismaClient from '../../prisma'
import { hash } from 'bcryptjs';


interface UserRequest {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    async execute({ name, email, password }: UserRequest) {

        //verificar se tem email
        if (!email) {
            throw new Error("Invalid email")
        }

        //verificar se já está cadastrado

        const userAlreadyExist = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExist) {
            throw new Error("User already exist")
        }

     const passwordHash = await hash(password,8) 

        //cadastrar usuário
        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },

            //retorna somente isto
            select:{
                id: true,
                name: true,
                email:true
                
            }
        })


        return { user }

    }
}

export { CreateUserService }
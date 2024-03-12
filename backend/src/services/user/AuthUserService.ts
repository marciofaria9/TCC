import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {

    async execute({ email, password }: AuthRequest) {

        // verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        // se não existir
        if (!user) {
            throw new Error("User or password incorrect")

        }
        //verificar senha
        const passwordMatch = await compare(password, user.password)


        if (!passwordMatch) {
            throw new Error("User or password incorrect")
        }

        // gerar token

        const token = sign(
            //header
            {
                name: user.name,
                email: user.email
            },
            //payload
            process.env.JWT_SECRET,
            //signature
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )


        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }
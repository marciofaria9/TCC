import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

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


        return { ok: true }
    }
}

export { AuthUserService }
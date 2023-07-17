import {FastifyRequest, FastifyReply, FastifyInstance} from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { compare } from 'bcrypt'

export class AutheticateUser {
    async authetication (request: FastifyRequest, reply: FastifyReply, app: FastifyInstance) {
        const autheticationSchema = z.object({
            email: z.string(),
            password: z.string(),
        })

        const { email, password } = autheticationSchema.parse(request.body)

        const userPassword = await prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                password: true,
            }
        })

        await request.headers.authorization

        if (userPassword?.password == null) {
            throw new Error('⚠ Email ou senha incorreta')
        }

        const passwordMatch = await compare(password, userPassword.password)

        if(!passwordMatch) {
            throw new Error('⚠ Email ou senha incorreta')
        }

        const userEmail = await prisma.user.findFirst({
            where: {
                email,
            },
            select: {
                id: true,
                nome: true,
                email: true,
            }
        })

        if (userEmail == undefined || userEmail == null ) {
            throw new Error('⚠ Email ou senha incorreta')
        }

        const token = app.jwt.sign(
            {
                nome: userEmail.nome,
                email: userEmail.email,
            },
            {
                sub: userEmail.id,
                expiresIn: '30 days'
            }
        )

        return reply.send(token)
    }
}
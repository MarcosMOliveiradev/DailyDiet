import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcrypt'

export class CreatedUser{
    async user( request: FastifyRequest, reply: FastifyReply, app: FastifyInstance) {
        const userSchema = z.object({
            nome: z.string(),
            email: z.string(),
            password: z.string(),
        })

        const {nome, email, password} = userSchema.parse(request.body)

        const user = await prisma.user.findUnique({
            where: {
                email
            },
        })

        if(user) {
            return reply.status(404).send('Usuario já existe!')
        }

        const passwordHas = await hash(password, 8)

        await prisma.user.create({
            data: {
                nome,
                email,
                password: passwordHas,
            }
        })

        return reply.status(201).send('Usuario criado!')
    }
}
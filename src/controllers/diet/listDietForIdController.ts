import {FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

export class ListDietForId{
    async ListForId(request: FastifyRequest, reply: FastifyReply){
        const idSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idSchema.parse(request.params)

        const listId = await prisma.diet.findUnique({
            where: {
                userId: request.user.sub,
                id,
            },
            select: {
                nome: true,
                descricao: true,
                dentroDieta: true,

                User: {
                    select: {
                        nome: true
                    }
                }
            }
        })

        return reply.status(201).send(listId)
    }
}
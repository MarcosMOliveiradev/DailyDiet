import {FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

export class DeletDiet {
    async deletDiet(request: FastifyRequest, reply: FastifyReply){
        const idSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = idSchema.parse(request.params)

        await prisma.diet.delete({
            where: {
                userId: request.user.sub,
                id,
            }
        })

        return reply.status(201).send('Dieta deletada com sucesso!')
    }
}
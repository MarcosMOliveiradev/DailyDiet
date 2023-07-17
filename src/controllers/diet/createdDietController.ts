import {FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';

export class CreatedDiet {
    async meal (request: FastifyRequest, reply: FastifyReply ) {
        const dietSchema = z.object({
            nome: z.string(),
            descricao: z.string(),
            dentroDieta: z.boolean(),
        })

        const { nome, descricao, dentroDieta } = dietSchema.parse(request.body)

        await prisma.diet.create({
            data: {
                nome,
                descricao,
                dentroDieta,

                userId: request.user.sub,
            }
        })

        return reply.status(201).send('Dieta criada com sucesso!')
    }
}

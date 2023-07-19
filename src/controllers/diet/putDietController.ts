import {FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

export class updateDiet {
    async update(request: FastifyRequest, reply: FastifyReply){
        const updateSchema = z.object({
            nome: z.string(),
            descricao: z.string(),
            dentroDieta: z.boolean().default(false)
        })

        const { nome, descricao, dentroDieta } = updateSchema.parse(request.body)

        const idSchema = z.object({
            id: z.string().uuid()
        })
        
        const { id } = idSchema.parse(request.params)

        await prisma.diet.update({
            where: {
                userId: request.user.sub,
                id,
            },
            data: {
                nome,
                descricao,
                dentroDieta,
            }
        })

        return reply.status(201).send('Dieta modificada com sucesso!')
    }
}
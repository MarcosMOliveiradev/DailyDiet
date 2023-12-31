import {FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../lib/prisma';

export class listDiet{
    async list( request: FastifyRequest, reply: FastifyReply ) {
        const getDiet = await prisma.diet.findMany({
            where: {
                userId: request.user.sub,
            },
            select: {
                nome: true,
                descricao: true,
                dentroDieta: true,
                data: true,

                User: {
                    select: {
                        nome: true
                    }
                }
            }
        })

        return reply.status(201).send(getDiet)
    }
}
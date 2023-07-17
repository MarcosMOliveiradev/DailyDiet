import {FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../lib/prisma';

export class listDiet{
    async list( request: FastifyRequest, reply: FastifyReply ) {
        const getDiet = await prisma.diet.findMany({
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

        return reply.status(201).send(getDiet)
    }
}
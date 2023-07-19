import {FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

export class SummaryDiet {
    async SummaryAllDiet ( request: FastifyRequest, reply: FastifyReply ) {
        const Summary = await prisma.diet.count()

        return reply.status(201).send(` Você Já cadastrou um total de ${Summary} alimentos`)
    }

    async SummaryDietTrue ( request: FastifyRequest, reply: FastifyReply ) {
        const Summary = await prisma.diet.count({
            where: {
                dentroDieta: true
            }
        })

        return reply.status(201).send(` Você Já cadastrou um total de ${Summary} alimentos dentro da dieta`)
    }

    async SummaryDietFalse ( request: FastifyRequest, reply: FastifyReply ) {
        const Summary = await prisma.diet.count({
            where: {
                dentroDieta: false
            }
        })

        return reply.status(201).send(` Você Já cadastrou um total de ${Summary} alimentos fora da dieta`)
    }

    async bestDiet ( request: FastifyRequest, reply: FastifyReply ) {
        const summaries = await prisma.diet.findMany({
            orderBy: {
                data: 'desc'
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
        });

        let foundFalse = false;
        const filteredSummaries = summaries.filter(summary => {
        if (foundFalse) {
            // Já encontramos um false, então descartamos os registros subsequentes
            return false;
        }
        if (summary.dentroDieta === false) {
            foundFalse = true;
        }
        return true;
        });

        const trueSequences: any = [];
        let currentSequence: any = [];
        filteredSummaries.forEach(summary => {
        if (summary.dentroDieta === true) {
            currentSequence.push(summary);
        } else {
            if (currentSequence.length > 0) {
            trueSequences.push(currentSequence);
            }
            currentSequence = [];
        }
        });

        return reply.status(201).send(JSON.stringify(trueSequences))
    }
}
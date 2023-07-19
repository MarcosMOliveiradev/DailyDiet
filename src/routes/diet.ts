import { FastifyInstance } from "fastify";
import { verify } from "../middlewares/jwtVerify";

import { CreatedDiet } from "../controllers/diet/createdDietController";
import { listDiet } from './../controllers/diet/listDietController';
import { ListDietForId } from "../controllers/diet/listDietForIdController";
import { updateDiet } from "../controllers/diet/putDietController";
import { DeletDiet } from './../controllers/diet/deletDietController';
import { SummaryDiet } from "../controllers/diet/summaryDietController";

const createdMeal = new CreatedDiet()
const getDiet = new listDiet()
const listForId = new ListDietForId()
const update = new updateDiet()
const deletDiet = new DeletDiet()
const summaryDiet = new SummaryDiet()

export async function diet(app: FastifyInstance) {
    app.post('/', {preHandler: [verify]}, async (request, reply) => {
        return createdMeal.meal(request, reply)
    })

    app.get('/', {preHandler: [verify]}, async (request, reply) => {
        return getDiet.list(request, reply)
    })

    app.get('/:id', {preHandler: [verify]}, async (request, reply) => {
        return listForId.ListForId(request, reply)
    })

    app.put('/:id', {preHandler: [verify]}, async (request, reply) => {
        return update.update(request, reply)
    })

    app.delete('/:id', {preHandler: [verify]}, async (request, reply) => {
        return deletDiet.deletDiet(request, reply)
    })

    app.get('/summary', {preHandler: [verify]}, async ( request, reply ) => {
        return summaryDiet.SummaryAllDiet( request, reply )
    })

    app.get('/summary/true', {preHandler: [verify]}, async ( request, reply ) => {
        return summaryDiet.SummaryDietTrue( request, reply )
    })

    app.get('/summary/false', {preHandler: [verify]}, async ( request, reply ) => {
        return summaryDiet.SummaryDietFalse( request, reply )
    })

    app.get('/bestmeal', {preHandler: [verify]}, async ( request, reply ) => {
        return summaryDiet.bestDiet( request, reply )
    })
}
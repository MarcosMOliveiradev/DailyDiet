import { FastifyInstance } from "fastify";
import { verify } from "../middlewares/jwtVerify";

import { CreatedDiet } from "../controllers/diet/createdDietController";
import { listDiet } from './../controllers/diet/listDietController';

const createdMeal = new CreatedDiet()
const getDiet = new listDiet()

export async function diet(app: FastifyInstance) {
    app.post('/', {preHandler: [verify]}, async (request, reply) => {
        return createdMeal.meal(request, reply)
    })

    app.get('/', {preHandler: [verify]}, async (request, reply) => {
        return getDiet.list(request, reply)
    })
}
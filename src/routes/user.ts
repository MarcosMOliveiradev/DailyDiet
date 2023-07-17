import { FastifyInstance } from "fastify";

import { CreatedUser } from "../controllers/user/CreatedUserController";
import { AutheticateUser } from "../controllers/user/authenticateUser/AuthenticateUserController";

const createUser = new CreatedUser()
const singIn = new AutheticateUser()

export async function usuario(app: FastifyInstance) {
    app.post('/created', async (request, reply) => {
        return createUser.user(request, reply, app)
    })

    app.post('/singIn', async (request, reply) => {
        return singIn.authetication(request, reply, app)
    })
}
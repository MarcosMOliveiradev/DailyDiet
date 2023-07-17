import fastify from "fastify";
import jwt from "@fastify/jwt";

import { usuario } from "./routes/user";
import { diet } from "./routes/diet";

export const app = fastify()

app.register(jwt, {
    secret: 'kljhfglkjdflkgjl'
})

app.register(usuario, {
    prefix: '/usuario'
})

app.register(diet, {
    prefix: '/diet'
})
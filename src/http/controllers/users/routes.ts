import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verify-jwt";

import { register } from "./register.controller";
import { authenticate } from "./athenticate.controller";
import { profile } from "./profile.controller";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  // Authenticated
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}

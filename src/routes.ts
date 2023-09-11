import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/userController";
import validateResource from "./middleware/validateResource";
import { createUserSchema } from "./schemas/userSchema";
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler,
} from "./controllers/sessionController";
import { createSessionSchema } from "./schemas/sessionSchema";
import requireUser from "./middleware/requireUser";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schemas/productSchema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controllers/productController";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteUserSessionHandler);
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.get(
    "/api/products/:productId",
    validateResource(getProductSchema),
    getProductHandler
  );
  app.delete(
    "/api/products/:productsId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
};

export default routes;

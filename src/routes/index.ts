import { IConfig } from "../common/IConfig";
import QuoteRoutes from "./quote";
import express, { Express, Request, Response } from "express";
import Logger from "../common/Logger";
const logger = Logger();

export default (config: IConfig) => (app: Express) => {
  // quote routes
  const quoteRoute = QuoteRoutes(config);
  app.use(quoteRoute);

  // default routes
  const defaultRouter = express.Router();
  defaultRouter.get("/*", (req: Request, res: Response) => {
    logger.info(`Not implemented - original path [${req.originalUrl}]`);
    res.status(501).json({ message: "Not implemented" });
  });
  app.use(defaultRouter);
};

import { IConfig } from "../common/IConfig";
import express, { Request, Response, Router } from "express";
import { LruCacheService } from "../services/impl/LruCacheService";
import { IExchangeRateOutput } from "../services/IExchangeRateProvider";
import { ExchangeRateProvider } from "../services/impl/ExchangeRateProvider";
import { ExchangeService } from "../services/impl/ExchangeService";
import { GetQuoteController } from "../controllers/quote/GetQuoteController";

export default (config: IConfig) => {
  const cache = new LruCacheService<IExchangeRateOutput>(4);
  const exchangeRateProvider = new ExchangeRateProvider(config, cache);
  const exchangeService = new ExchangeService(exchangeRateProvider);
  const getQuote = new GetQuoteController(exchangeService);

  const router: Router = express.Router();

  router.get("/quote", (req: Request, res: Response) =>
    getQuote.exec(req, res)
  );

  return router;
};

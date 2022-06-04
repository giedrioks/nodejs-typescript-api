import { Request, Response } from "express";
import { BaseController } from "../BaseController";
import {
  IExchangeOutput,
  IExchangeService,
} from "../../services/IExchangeService";

interface ValidationResult {
  isValid: boolean;
  error?: string;
  params: {
    [key: string]: any;
  };
}

interface ValidationInput {
  baseCurrency: string;
  quoteCurrency: string;
  baseAmount: string;
}

export class GetQuoteController extends BaseController {
  private exchangeService: IExchangeService;
  private allowedCurrencies: string[] = ["USD", "EUR", "GBP", "ILS"];

  constructor(exchangeService: IExchangeService) {
    super();
    this.exchangeService = exchangeService;
  }

  async internalExecution(req: Request, res: Response): Promise<void | object> {
    const queryParams = req.query as unknown as ValidationInput;
    const validation = this.validateInputParameters(queryParams);
    if (!validation.isValid) {
      return this.badRequest(res, validation.error);
    }

    const result: IExchangeOutput = await this.exchangeService.exchange({
      from: validation.params.baseCurrency,
      to: validation.params.quoteCurrency,
      amount: validation.params.baseAmount,
    });

    this.ok<{ exchangeRate: number; quoteAmount: number }>(res, {
      exchangeRate: result.rate,
      quoteAmount: result.amount,
    });
  }

  private validateInputParameters(input: ValidationInput): ValidationResult {
    if (
      !input.baseCurrency ||
      !input.quoteCurrency ||
      !input.baseAmount ||
      !this.isValidInteger(input.baseAmount)
    )
      return { isValid: false, error: "Invalid input parameters", params: {} };

    if (!this.allowedCurrencies.includes(input.baseCurrency.toUpperCase()))
      return {
        isValid: false,
        error: "baseCurrency not supported",
        params: {},
      };

    if (!this.allowedCurrencies.includes(input.quoteCurrency.toUpperCase()))
      return {
        isValid: false,
        error: "quoteCurrency not supported",
        params: {},
      };

    return {
      isValid: true,
      params: {
        baseCurrency: input.baseCurrency,
        quoteCurrency: input.quoteCurrency,
        baseAmount: parseInt(input.baseAmount),
      },
    };
  }

  private isValidInteger(numberString: string): boolean {
    const number = parseInt(numberString);
    if (isNaN(number)) return false;
    return Number.isInteger(number);
  }
}

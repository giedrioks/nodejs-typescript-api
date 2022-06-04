import {
  IExchangeInput,
  IExchangeOutput,
  IExchangeService,
} from "../IExchangeService";
import {
  IExchangeRateOutput,
  IExchangeRateProvider,
} from "../IExchangeRateProvider";

export class ExchangeService implements IExchangeService {
  private exchangeRateProvider: IExchangeRateProvider;

  constructor(exchangeRateProvider: IExchangeRateProvider) {
    this.exchangeRateProvider = exchangeRateProvider;
  }

  public async exchange(input: IExchangeInput): Promise<IExchangeOutput> {
    const result: IExchangeRateOutput | undefined =
      await this.exchangeRateProvider.get({
        base: input.from,
      });

    if (!result || !result.rates[input.to])
      throw new Error(`Unable to retrieve rates for currency [${input.to}]`);

    const rate: number = result.rates[input.to];
    const amount = input.amount * rate;

    return { rate: rate, amount: this.round(amount) };
  }

  private round(value: number): number {
    return Math.round(value);
  }
}

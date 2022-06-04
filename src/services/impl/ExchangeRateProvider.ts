import {
  IExchangeRateInput,
  IExchangeRateOutput,
  IExchangeRateProvider,
} from '../IExchangeRateProvider';
import { IConfig } from '../../common/IConfig';
import fetch, { Response } from 'node-fetch';
import { ICacheService } from '../ICacheService';

export class ExchangeRateProvider implements IExchangeRateProvider {
  private config: IConfig;
  private cache: ICacheService<IExchangeRateOutput>;

  constructor(config: IConfig, cache: ICacheService<IExchangeRateOutput>) {
    this.config = config;
    this.cache = cache;
  }

  public async get(
    input: IExchangeRateInput
  ): Promise<IExchangeRateOutput | undefined> {
    if (this.cache.has(input.base)) {
      return this.cache.get(input.base);
    }

    const newRates = await this.getRates(input.base);
    const value = { rates: newRates.rates };

    this.cache.put(input.base, value);
    return value;
  }

  private async getRates(
    base: string
  ): Promise<{ base: string; rates: { [key: string]: number } }> {
    const url = `${this.config.providers.exchangeRate.url}/${base}`;
    const response: Response = await fetch(url);
    return await response.json();
  }
}

export interface IExchangeRateProvider {
  get(input: IExchangeRateInput): Promise<IExchangeRateOutput | undefined>;
}

export interface IExchangeRateInput {
  base: string;
}

export interface IExchangeRateOutput {
  rates: { [key: string]: number };
}

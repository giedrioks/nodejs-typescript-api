export interface IExchangeService {
  exchange(input: IExchangeInput): Promise<IExchangeOutput>;
}

export interface IExchangeInput {
  from: string;
  to: string;
  amount: number;
}

export interface IExchangeOutput {
  rate: number;
  amount: number;
}

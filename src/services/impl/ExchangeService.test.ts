import { ExchangeService } from './ExchangeService';
import { IExchangeRateProvider } from '../IExchangeRateProvider';

describe('Exchange service tests', () => {
  test('Calculates proper amount when rate provider returns successfully', async () => {
    const mockedProvider = {
      get: async () => Promise.resolve({ rates: { EUR: 1.23, GBP: 1.01 } }),
    } as IExchangeRateProvider;

    const service = new ExchangeService(mockedProvider);
    const result = await service.exchange({
      from: 'USD',
      to: 'EUR',
      amount: 100,
    });

    expect(result.amount).toBe(123);
  });

  test('Returns rate from rate provider with amount', async () => {
    const mockedProvider = {
      get: async () => Promise.resolve({ rates: { EUR: 1.23, GBP: 1.01 } }),
    } as IExchangeRateProvider;

    const service = new ExchangeService(mockedProvider);
    const result = await service.exchange({
      from: 'USD',
      to: 'EUR',
      amount: 100,
    });

    expect(result.rate).toBe(1.23);
  });

  test('Throws exception, when rate provider internally trows exception', async () => {
    const mockedProvider = {
      get: async () => {
        throw new Error('Server unavailable');
      },
    } as IExchangeRateProvider;

    const service = new ExchangeService(mockedProvider);

    await expect(
      service.exchange({
        from: 'USD',
        to: 'EUR',
        amount: 100,
      })
    ).rejects.toEqual(new Error('Server unavailable'));
  });

  test('Throws exception, when rate provider returns empty result', async () => {
    const mockedProvider = {
      get: async () => Promise.resolve(),
    } as IExchangeRateProvider;

    const service = new ExchangeService(mockedProvider);

    await expect(
      service.exchange({
        from: 'USD',
        to: 'EUR',
        amount: 100,
      })
    ).rejects.toEqual(new Error('Unable to retrieve rates for currency [EUR]'));
  });
});

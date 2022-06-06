jest.mock('node-fetch');
import fetch from 'node-fetch';
const { Response } = jest.requireActual('node-fetch');

import { ExchangeRateProvider } from './ExchangeRateProvider';
import { ICacheService } from '../ICacheService';

describe('Exchange rate provider tests', () => {
  const MOCKED_CONFIG = {
    providers: {
      exchangeRate: { url: 'http://exchange_rate_api/' },
    },
    app: { port: 1 },
  };

  test('When value exists in cache, returns cached value', async () => {
    const mockedResult = { key1: 'value1' };
    const mockedCache: ICacheService<any> = {
      has: () => true,
      get: jest.fn(() => mockedResult),
      put: jest.fn(),
    };
    const exchangeRateProvider = new ExchangeRateProvider(
      MOCKED_CONFIG,
      mockedCache
    );

    const result = await exchangeRateProvider.get({ base: 'USD' });

    expect(result).toMatchObject(mockedResult);
    expect(mockedCache.get).toHaveBeenCalledTimes(1);
  });

  test('When value does not exit in cache, returns new value from external service', async () => {
    const mockedResult = { rates: { EUR: 1.21 } };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify(mockedResult)))
    );
    const mockedCache: ICacheService<any> = {
      has: () => false,
      get: jest.fn(),
      put: jest.fn(),
    };
    const exchangeRateProvider = new ExchangeRateProvider(
      MOCKED_CONFIG,
      mockedCache
    );

    const result = await exchangeRateProvider.get({ base: 'USD' });

    expect(result).toMatchObject(mockedResult);
    expect(mockedCache.get).toHaveBeenCalledTimes(0);
  });

  test('When retrieved from external service, new value is put in cache', async () => {
    const mockedResult = { rates: { EUR: 1.22 } };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockReturnValue(
      Promise.resolve(new Response(JSON.stringify(mockedResult)))
    );
    const mockedCache: ICacheService<any> = {
      has: () => false,
      get: jest.fn(),
      put: jest.fn(),
    };
    const exchangeRateProvider = new ExchangeRateProvider(
      MOCKED_CONFIG,
      mockedCache
    );

    const result = await exchangeRateProvider.get({ base: 'USD' });

    expect(result).toMatchObject(mockedResult);
    expect(mockedCache.put).toHaveBeenCalledTimes(1);
    expect(mockedCache.put).toHaveBeenLastCalledWith('USD', mockedResult);
  });
});

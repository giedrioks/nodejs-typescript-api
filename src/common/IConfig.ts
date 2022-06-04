export interface IConfig {
  app: {
    port: number;
  };
  providers: {
    exchangeRate: {
      url: string | undefined;
    };
  };
}

export default (): IConfig => ({
  app: {
    port: process.env.APP_PORT ? Number.parseInt(process.env.APP_PORT) : 3000,
  },
  providers: {
    exchangeRate: {
      url: process.env.EXCHANGE_RATE_PROVIDER_URL,
    },
  },
});

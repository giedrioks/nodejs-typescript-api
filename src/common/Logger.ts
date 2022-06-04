import pino, { Logger } from 'pino';

export interface ILogger {
  debug(message: string, data?: object): void;
  info(message: string, data?: object): void;
  error(message: string, data?: object): void;
}

export default (): ILogger => {
  const logger: Logger = pino();

  const debug = (message: string, data?: object): void =>
    logger.debug(data ? data : {}, message);
  const info = (message: string, data?: object): void =>
    logger.info(data ? data : {}, message);
  const error = (message: string, data?: object): void =>
    logger.error(data ? data : {}, message);

  return {
    debug,
    info,
    error,
  };
};

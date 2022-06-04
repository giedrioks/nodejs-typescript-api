import express, { Request, Response } from 'express';
import Logger from '../common/Logger';
const logger = Logger();

export abstract class BaseController {
  protected abstract internalExecution(
    req: Request,
    res: Response
  ): Promise<void | object>;

  public async exec(req: Request, res: Response): Promise<void> {
    try {
      await this.internalExecution(req, res);
    } catch (err) {
      logger.error(`[BaseController] - Unexpected error`, { err });
      this.error(res, 'An unexpected error occurred');
    }
  }

  public static jsonResponse(
    res: express.Response,
    code: number,
    message: string
  ) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, body?: T) {
    if (body) {
      return res.type('application/json').status(200).json(body);
    } else {
      return res.sendStatus(200);
    }
  }

  public badRequest(res: express.Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      400,
      message ? message : 'Bad request'
    );
  }

  public error(res: Response, error: Error | string) {
    logger.error(error.toString(), { error });
    return res.status(500).json({
      message: error.toString(),
    });
  }
}

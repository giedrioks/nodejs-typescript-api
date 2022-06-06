import Configuration from './common/IConfig';
import Logger from './common/Logger';
import { Application } from './Application';

const logger = Logger();
const config = Configuration();
const app = new Application(config).getInstance();

app.listen(config.app.port, () => {
  logger.info(
    `️[server]: Server is running at http://localhost:${config.app.port}`
  );
});

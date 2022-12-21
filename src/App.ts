import * as Express from 'express';
import { EnvVars, safeGetEnvVar } from './config';
import { enableModules } from '@module/index';
import { enablePlugins } from './plugin/enablePlugins';
import * as http from 'http';

class App {
  private port: number = parseInt(safeGetEnvVar(EnvVars.PORT));
  public app: Express.Express;

  constructor() {
    this.app = Express();
    enablePlugins(this.app);
    enableModules(this.app);
  }

  public listen() {
    const server = http.createServer(this.app);
    server.listen(this.port);
    console.log('listening ' + this.port);
  }
}

export default App;

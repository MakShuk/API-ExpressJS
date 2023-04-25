import { Logger, ILogObj } from 'tslog';


export interface ILogger {
  logger: Logger<ILogObj>;
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
}


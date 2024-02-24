import winston from 'winston'

export class Logger {
  private static infoLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  })

  private static errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  })

  static error(msg: unknown, data?: unknown): void {
    this.errorLogger.error({
      timeStamp: new Date().toLocaleString(),
      message: msg,
      data,
    })
  }

  static info(msg: unknown, data?: unknown): void {
    this.infoLogger.info({
      timeStamp: new Date().toLocaleString(),
      message: msg,
      data,
    })
  }
}

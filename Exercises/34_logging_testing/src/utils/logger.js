import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    verbose: 5,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    http: "green",
    verbose: "white",
  },
};

const devLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "verbose",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "http",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./warn.log",
      level: "warning",
      format: winston.format.simple(),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  process.env.ENVIRONMENT === "prod"
    ? (req.logger = prodLogger)
    : (req.logger = devLogger);
  req.logger.http(
    `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  req.logger.verbose(
    `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  req.logger.warning(
    `${req.method} in ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  next();
};

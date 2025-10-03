
import TracerLog from "../models/TracerLogModel.js";

const logMiddleware = async (req, res, next) => {
  const logs = [];
  const originalConsole = { ...console };

  ["log", "error", "warn", "info"].forEach((method) => {
    console[method] = (...args) => {
      logs.push({ type: method.toUpperCase(), message: args.join(" ") });
      originalConsole[method](...args);
    };
  });

  const start = Date.now();

  res.on("finish", async () => {
    const responseTimeMs = Date.now() - start;

    await TracerLog.create({
      apiName: req.originalUrl,
      statusCode: res.statusCode,
      responseTimeMs,
      logs,
    });

    Object.assign(console, originalConsole);
  });

  next();
};

export default logMiddleware;

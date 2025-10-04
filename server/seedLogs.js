import mongoose from "mongoose";
import TracerLog from "./models/TracerLogModel.js";
import connectDB from "./config/db.js";

const seedLogs = async () => {
  await connectDB();

  try {
    const apis = ["/api/user", "/api/orders", "/api/products", "/api/inventory", "/api/payments"];
    const methods = ["GET", "POST", "PUT", "DELETE"];
    const statusCodes = [200, 201, 204, 400, 401, 404, 500, 503];

    const logs = Array.from({ length: 100 }).map((_, i) => {
      const api = apis[Math.floor(Math.random() * apis.length)];
      const method = methods[Math.floor(Math.random() * methods.length)];
      const status = statusCodes[Math.floor(Math.random() * statusCodes.length)];
      const responseTime = Math.floor(Math.random() * 1000) + 100; // 100–1100ms

      const month = Math.floor(Math.random() * 12); 
      const day = Math.floor(Math.random() * 28) + 1; 
      const date = new Date(2025, month, day, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

      return {
        traceId: `trace-${Date.now()}-${i}`,
        method,
        apiName: api,
        status,
        responseTimeMs: responseTime,
        timestamp: date,  
        logs: [
          {
            timestamp: date,
            type: "info",
            message: `Incoming ${method} request to ${api}`,
          },
          {
            timestamp: date,
            type: status >= 400 ? "error" : "info",
            message:
              status >= 400
                ? `Error occurred with status ${status}`
                : `Request completed successfully with status ${status}`,
          },
        ],
      };
    });

    await TracerLog.insertMany(logs);

    console.log("100 random tracer logs added across last 30 days!");
    process.exit();
  } catch (err) {
    console.error("Error seeding tracer logs:", err);
    process.exit(1);
  }
};

seedLogs();

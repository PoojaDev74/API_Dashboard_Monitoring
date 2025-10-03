import mongoose from "mongoose";
import TracerLog from "./models/TracerLogModel.js";
import connectDB from "./config/db.js";

const seedLogs = async () => {
  await connectDB();

  try {
     // Some sample APIs & methods //
    const apis = ["/api/user", "/api/orders", "/api/products", "/api/inventory", "/api/payments"];
    const methods = ["GET", "POST", "PUT", "DELETE"];
    const statusCodes = [200, 201, 204, 400, 401, 404, 500, 503];

    // Generate 20 random logs //
    const logs = Array.from({ length: 20 }).map((_, i) => {
      const api = apis[Math.floor(Math.random() * apis.length)];
      const method = methods[Math.floor(Math.random() * methods.length)];
      const status = statusCodes[Math.floor(Math.random() * statusCodes.length)];
      const responseTime = Math.floor(Math.random() * 1000) + 100; // 100–1100ms

      return {
        traceId: `trace-${Date.now()}-${i}`, // unique traceId
        method,
        apiName: api,
        status,
        responseTimeMs: responseTime,
        logs: [
          {
            timestamp: new Date(),
            type: "info",
            message: `Incoming ${method} request to ${api}`,
          },
          {
            timestamp: new Date(),
            type: status >= 400 ? "error" : "info",
            message:
              status >= 400
                ? `Error occurred with status ${status}`
                : `Request completed successfully with status ${status}`,
          },
        ],
      };
    });

    //  Insert without deleting old data  //
    await TracerLog.insertMany(logs);

    console.log("20 random tracer logs added successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding tracer logs:", err);
    process.exit(1);
  }
};

seedLogs();

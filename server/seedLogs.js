import mongoose from "mongoose";
import TracerLog from "./models/TracerLogModel.js";
import connectDB from "./config/db.js";  // make sure this connects to MongoDB

const seedLogs = async () => {
  await connectDB();

  try {
    // Clear old logs
    await TracerLog.deleteMany({});

    // Sample log entries
    const logs = [
      {
        traceId: "a1b2c3d4-1234-5678-9abc-def000001",
        method: "GET",
        apiName: "/api/user",
        status: 200,
        responseTimeMs: 478,
        logs: [
          {
            timestamp: new Date(),
            type: "info",
            message: "Entered userController",
          },
          {
            timestamp: new Date(),
            type: "info",
            message: "Calling DB to fetch user with id: 101",
          },
          {
            timestamp: new Date(),
            type: "info",
            message: "Sending response with user",
          },
        ],
      },
      {
        traceId: "a1b2c3d4-1234-5678-9abc-def000002",
        method: "POST",
        apiName: "/api/orders",
        status: 201,
        responseTimeMs: 320,
        logs: [
          {
            timestamp: new Date(),
            type: "info",
            message: "Entered orderController",
          },
          {
            timestamp: new Date(),
            type: "info",
            message: "Validating request body",
          },
          {
            timestamp: new Date(),
            type: "info",
            message: "Order created successfully",
          },
        ],
      },
      {
        traceId: "a1b2c3d4-1234-5678-9abc-def000003",
        method: "GET",
        apiName: "/api/products",
        status: 503,
        responseTimeMs: 890,
        logs: [
          {
            timestamp: new Date(),
            type: "info",
            message: "Entered productController",
          },
          {
            timestamp: new Date(),
            type: "error",
            message: "Database timeout while fetching products",
          },
        ],
      },
    ];

    await TracerLog.insertMany(logs);
    console.log("✅ Tracer logs seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding tracer logs:", err);
    process.exit(1);
  }
};

seedLogs();

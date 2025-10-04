// seed.js
import connectDB from "./config/db.js";
import Control from "./models/controlModel.js";

const seedData = [
  { apiName: "/api/user", startDate: new Date("2025-01-01"), enabled: true },
  { apiName: "/api/orders", startDate: new Date("2025-02-15"), enabled: true },
  { apiName: "/api/products", startDate: new Date("2025-03-01"), enabled: true },
  { apiName: "/api/inventory", startDate: new Date("2025-04-01"), enabled: true },
  { apiName: "/api/payments", startDate: new Date("2025-05-01"), enabled: true }
];

const seedDB = async () => {
  await connectDB();
  try {
    for (const api of seedData) {
      const exists = await Control.findOne({ apiName: api.apiName });
      if (!exists) {
        await Control.create(api);
        console.log(`Added new control: ${api.apiName}`);
      } else {
        console.log(`Skipped (already exists): ${api.apiName}`);
      }
    }
    console.log("Control seeding complete!");
    process.exit();
  } catch (error) {
    console.error("Error seeding controls:", error);
    process.exit(1);
  }
};

seedDB();

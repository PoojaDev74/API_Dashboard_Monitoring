// seed.js
import connectDB from "./config/db.js";
import Control from "./models/controlModel.js";

const seedData = [
  { apiName: "/api/social", startDate: new Date("2024-01-01"), enabled: true },
  { apiName: "/api/link", startDate: new Date("2024-02-15"), enabled: true },
  { apiName: "/api/data", startDate: new Date("2024-03-01"), enabled: true },
  { apiName: "/api/weather", startDate: new Date("2024-01-20"), enabled: true },
  { apiName: "/api/inventory", startDate: new Date("2024-04-01"), enabled: true }
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

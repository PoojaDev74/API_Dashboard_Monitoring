const connectDB = require("./config/db");
const Control = require("./models/controlModel");

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
    await Control.deleteMany({});
    await Control.insertMany(seedData);
    console.log("✅ API controls seeded");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();

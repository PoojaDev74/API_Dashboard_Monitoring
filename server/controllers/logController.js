import TracerLog from "../models/TracerLogModel.js";
import moment from "moment";

export const getLogs = async (req, res) => {
  try {
    const todayStart = moment().startOf("day").toDate();
    const todayEnd = moment().endOf("day").toDate();

    const yesterdayStart = moment().subtract(1, "day").startOf("day").toDate();
    const yesterdayEnd = moment().subtract(1, "day").endOf("day").toDate();

    const todayLogs = await TracerLog.find({
      "logs.timestamp": { $gte: todayStart, $lte: todayEnd }
    }).sort({ "logs.timestamp": -1 });

    const yesterdayLogs = await TracerLog.find({
      "logs.timestamp": { $gte: yesterdayStart, $lte: yesterdayEnd }
    }).sort({ "logs.timestamp": -1 });

    res.json({
      today: todayLogs,
      yesterday: yesterdayLogs
    });
  } catch (err) {
    console.error("❌ Error fetching logs:", err);
    res.status(500).json({ error: "Failed to fetch logs" });
  }
};

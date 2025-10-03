import TracerLog from "../models/TracerLogModel.js";
import Control from "../models/controlModel.js";
import moment from "moment";

export const getApiStatus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const year = parseInt(req.query.year) || new Date().getFullYear();

    const startDate = moment(`${year}-${page}-01`).startOf("month").toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    const apis = await Control.find();

    const data = await Promise.all(
      apis.map(async (api) => {
        const logs = await TracerLog.find({
          apiName: api.apiName,
          timestamp: { $gte: startDate, $lte: endDate },
        }).sort({ timestamp: 1 });

        return {
          apiName: api.apiName,
          statuses: logs.map((l) => ({
            timestamp: l.timestamp,
            statusCode: l.statusCode,
          })),
        };
      })
    );

    res.json({
      data,
      pagination: { currentPage: page, totalPages: 12 },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load status" });
  }
};

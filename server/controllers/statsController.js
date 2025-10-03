import TracerLog from "../models/TracerLogModel.js";
import moment from "moment";

console.log("✅ statsController loaded");

export const getAnalytics = async (req, res) => {
  try {
    console.log("📊 getAnalytics called");
    res.json({ message: "Analytics endpoint working!" });
    
    const { start, end } = req.query;

    const startDate = start ? new Date(start) : moment().subtract(7, "days").toDate();
    const endDate = end ? new Date(end) : new Date();

    const logs = await TracerLog.find({
      timestamp: { $gte: startDate, $lte: endDate },
    });

    const totalRequests = logs.length;
    const successfulRequests = logs.filter(l => l.status >= 200 && l.status < 300).length;
    const errorRequests = logs.filter(l => l.status >= 400).length;

    // Average Response Time
    const avgResponseTime = totalRequests
      ? (logs.reduce((sum, l) => sum + l.responseTimeMs, 0) / totalRequests).toFixed(2)
      : 0;

    // Peak Latency (max response time)
    const peakLatency = totalRequests
      ? Math.max(...logs.map(l => l.responseTimeMs))
      : 0;

    const uptime = totalRequests ? ((successfulRequests / totalRequests) * 100).toFixed(2) : 0;
    const errorRate = totalRequests ? ((errorRequests / totalRequests) * 100).toFixed(2) : 0;

    // Most common error
    const errorCounts = {};
    logs.forEach(l => {
      if (l.status >= 400) {
        errorCounts[l.status] = (errorCounts[l.status] || 0) + 1;
      }
    });
    const mostCommonError = Object.keys(errorCounts).length
      ? Object.entries(errorCounts).sort((a, b) => b[1] - a[1])[0][0]
      : null;

    // Last downtime
    const lastDowntime = logs
      .filter(l => l.status >= 400)
      .sort((a, b) => b.timestamp - a.timestamp)[0]?.timestamp || null;

    // Uptime trend
    const groupedByDay = {};
    logs.forEach(l => {
      const day = moment(l.timestamp).format("YYYY-MM-DD");
      if (!groupedByDay[day]) groupedByDay[day] = { total: 0, success: 0 };
      groupedByDay[day].total++;
      if (l.status >= 200 && l.status < 300) groupedByDay[day].success++;
    });

    const uptimeTrend = Object.entries(groupedByDay).map(([date, vals]) => ({
      date,
      uptime: ((vals.success / vals.total) * 100).toFixed(2),
    }));

    res.json({
      totalRequests,
      avgResponseTime,
      peakLatency,   // ✅ NEW FIELD
      uptime,
      errorRate,
      mostCommonError,
      lastDowntime,
      uptimeTrend,
    });
  } catch (err) {
    console.error("Error in getAnalytics:", err);
    res.status(500).json({ error: "Failed to calculate analytics" });
  }
};

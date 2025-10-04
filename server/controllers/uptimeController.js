import TracerLog from "../models/TracerLogModel.js";

export const getUptime = async (req, res) => {
  try {
    const { year, month } = req.query;
      if (!year || !month) {
      return res.status(400).json({ error: "Year and month are required" });
    }
    
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0, 23, 59, 59);

    const logs = await TracerLog.find({
      timestamp: { $gte: start, $lte: end }
    });

    if (logs.length === 0) return res.json({ data: [] });

    const daysInMonth = new Date(year, month, 0).getDate();
    const results = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStart = new Date(year, month - 1, day, 0, 0, 0);
      const dayEnd = new Date(year, month - 1, day, 23, 59, 59);

      const dayLogs = logs.filter(
        (l) => l.timestamp >= dayStart && l.timestamp <= dayEnd
      );

      if (dayLogs.length === 0) {
        results.push({ date: `${year}-${month}-${day}`, uptime: null });
        continue;
      }

      const total = dayLogs.length;
      const success = dayLogs.filter(l => l.status >= 200 && l.status < 300).length;
      const uptime = ((success / total) * 100).toFixed(2);

      results.push({ date: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`, uptime });
    }

    res.json({ data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load uptime data" });
  }
};

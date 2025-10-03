import Control from "../models/controlModel.js";

export const getControls = async (req, res) => {
  const controls = await Control.find();
  res.json(controls);
};

export const updateControl = async (req, res) => {
  const { apiName } = req.params;
  const updates = req.body;
  try {
    const updated = await Control.findOneAndUpdate({ apiName }, updates, { new: true, upsert: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

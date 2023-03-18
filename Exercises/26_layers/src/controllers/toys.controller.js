import { toys } from "../persistence/dao.js";

export const getToys = async (req, res) => {
  res.send(await toys.getToys());
};

export const saveToy = async (req, res) => {
  const newToy = req.body;
  toys.saveToy(newToy);
  res.status(200).json({ msg: "toys added successfully" });
};

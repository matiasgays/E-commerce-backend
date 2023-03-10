import express from "express";
import petsModel from "../models/pets.model.js";

const petsRouter = express.Router();

petsRouter.get("/:pet([a-zA-Z%C2%A0]+)", async (req, res) => {
  return res.status(200).json(req.pet);
});

petsRouter.post("/", async (req, res) => {
  const { name, specie } = req.body;
  if (!name || !specie)
    return res.status(400).json({ message: "Name and specie are required" });
  try {
    const newPet = await petsModel.create(req.body);
    return res.status(200).json(newPet);
  } catch (error) {
    res.status(500).json({ message: "Server could post pet", error });
  }
});

petsRouter.put("/:pet([a-zA-Z%C2%A0]+)", async (req, res) => {
  try {
    const petUpdated = await petsModel.updateOne(
      { name: req.pet.name },
      {
        adopted: true,
      }
    );
    return res.status(200).json(petUpdated);
  } catch (error) {
    res.status(500).json({ message: "Server could put pet", error });
  }
});

petsRouter.get("*", (req, res) => {
  return res.status(400).json({ message: "Cannot get the specified pet" });
});

petsRouter.param("pet", async (req, res, next, pet) => {
  try {
    const searchPet = await petsModel.findOne({ name: pet });
    console.log(searchPet);
    if (!searchPet) req.pet = null;
    else req.pet = searchPet;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server could get pets", error });
  }
});

export default petsRouter;

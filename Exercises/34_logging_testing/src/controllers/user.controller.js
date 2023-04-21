import usersModel from "../models/user.model.js";
import { isValidPassword, createHash } from "../utils/utils.js";

export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log(
    `Registering ${firstname} ${lastname} email: ${email} and password: ${password}`
  );
  if (!firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  }
  const exist = await usersModel.findOne({ email });
  if (exist)
    return res
      .status(400)
      .send({ status: "error", error: "User already exists" });
  const hashedPassword = await createHash(password);
  const user = {
    firstname,
    lastname,
    email,
    password: hashedPassword,
  };
  await usersModel.create(user);
  res.status(200).send({ status: "success", payload: "New user registered" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Incomplete values" });
  const user = await usersModel.findOne({ email });
  if (!user)
    return res.status(400).send({ status: "error", error: "User not found" });
  // const validPassword = await isValidPassword(user, password);
  // if (!validPassword)
  //   return res
  //     .status(400)
  //     .send({ status: "error", error: "Incorrect password" });
  console.log(`El ingreso de ${email} fue satisfactorio`);
  res.status(200).send({ status: "success", payload: "User logged in" });
};

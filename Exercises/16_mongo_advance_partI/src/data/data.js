import studentModel from "../models/studentModel.js";
const studentList = [];

export const addStudent = async () => {
  try {
    await studentModel.create({
      name: "mello",
      lastName: "gays",
      email: "ing.matiasgays@gmail.com",
      gender: "M",
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const addCourse = async () => {
  try {
    await courseModel.create({
      title: "BackEnd course",
      description: "It is a course to develop fancy servers",
      difficulty: 5,
      topics: ["JavaScript", "Handlebars", "Socket.io", "Middlewares"],
      professor: "Matias",
    });
  } catch (error) {
    throw new Error(error);
  }
};

const names = [
  "eduardo",
  "gaston",
  "luciana",
  "mariana",
  "felipe",
  "hernan",
  "santiago",
  "guillermina",
  "jorgelina",
];

const lastNames = [
  "sanches",
  "godoy",
  "fernandez",
  "ropolo",
  "billu",
  "antivero",
  "castro",
  "ortega",
];

const randomNumberFromArray = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return randomIndex;
};

const genderList = ["F", "M"];

export const generateStudents = (quantity) => {
  for (let i = 0; i < quantity; i++) {
    let name = names[randomNumberFromArray(names)];
    let lastName = lastNames[randomNumberFromArray(lastNames)];
    let email = `${name.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`;
    let gender = genderList[randomNumberFromArray(genderList)];
    studentList.push({ name, lastName, email, gender });
  }
  return studentList;
};

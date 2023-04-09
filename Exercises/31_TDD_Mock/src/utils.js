import { faker } from "@faker-js/faker";

faker.locale = "en";

export const generateUser = () => {
  const numOfProducts = parseInt(
    faker.random.numeric(1, { bannedDigits: ["0"] })
  );
  const products = [];
  for (let i = 0; i < numOfProducts; i++) {
    products.push(generateProduct());
  }

  return {
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    sex: faker.name.sex(),
    birthDate: faker.date.birthdate(),
    phone: faker.phone.number(),
    products,
    image: faker.internet.avatar(),
    id: faker.database.mongodbObjectId(),
    email: faker.internet.email(),
    jobTitle: faker.name.jobTitle(),
    premiumMembership: faker.datatype.boolean(),
    role: faker.helpers.arrayElement(["client", "seller"]),
  };
};

const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.random.numeric(1),
    id: faker.database.mongodbObjectId(),
    image: faker.image.image(),
    code: faker.datatype.uuid(),
    description: faker.commerce.productDescription(),
  };
};

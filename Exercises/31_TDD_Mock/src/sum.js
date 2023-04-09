const sum = (...num) => {
  if (num.length === 0) return 0;
  let result = 0;
  for (let i = 0; i < num.length; i++) {
    if (typeof num[i] !== "number") return null;
    result += num[i];
  }
  return result;
};

const sumRefactor = (...num) => {
  if (num.length === 0) return 0;
  if (!num.every((num) => typeof num === "number")) return null;
  return num.reduce((a, b) => a + b);
};

const resTest1 = sumRefactor(2, "2");
resTest1 === null
  ? console.log("Test1: passed")
  : console.log("Test1: invalid");
const resTest2 = sumRefactor();
resTest2 === 0 ? console.log("Test2: passed") : console.log("Test2: invalid");
const resTest3 = sumRefactor(2, 2);
resTest3 === 4 ? console.log("Test3: passed") : console.log("Test3: invalid");
const resTest4 = sumRefactor(2, 2, 4, 2, 8, 2);
resTest4 === 20 ? console.log("Test4: passed") : console.log("Test4: invalid");

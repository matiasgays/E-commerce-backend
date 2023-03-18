function complexOperation() {
  let result = 0;

  for (let i = 0; i < 5e9; i++) {
    result += i;
  }

  return result;
}

// export default complexOperation;

process.on("message", () => {
  const result = complexOperation();
  process.send(result);
});

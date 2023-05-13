const test = process.argv[3];

switch (test) {
  case "p":
    await import("./product.test.js");
    break;
  case "c":
    await import("./cart.test.js");
    break;
  case "s":
    await import("./session.test.js");
    break;
}

const login = (user, password) => {
  if (!user) return "User has not been provided";
  if (!password) return "Password has not been provided";
  if (password !== "1234") return "Invalid password";
  if (user !== "mello") return "Invalid username";
  return "Logged in";
};

// Si se pasa un password vacío, la función debe consologuear (“No se ha proporcionado un password”)
// Si se pasa un usuario vacío, la función debe consologuear (“No se ha proporcionado un usuario”)
// Si se pasa un password incorrecto, consologuear (“Contraseña incorrecta”)
// Si se pasa un usuario incorrecto, consologuear (“Credenciales incorrectas”)
// Si  el usuario y contraseña coinciden, consologuear (“logueado”)

const resTest1 = login("mello", "");
resTest1 === "Password has not been provided"
  ? console.log("Test1: passed")
  : console.log("Test1: invalid");
const resTest2 = login("", "1234");
resTest2 === "User has not been provided"
  ? console.log("Test2: passed")
  : console.log("Test2: invalid");
const resTest3 = login("mello", "123");
resTest3 === "Invalid password"
  ? console.log("Test3: passed")
  : console.log("Test3: invalid");
const resTest4 = login("matias", "1234");
resTest4 === "Invalid username"
  ? console.log("Test4: passed")
  : console.log("Test4: invalid");
const resTest5 = login("mello", "1234");
resTest5 === "Logged in"
  ? console.log("Test5: passed")
  : console.log("Test5: invalid");

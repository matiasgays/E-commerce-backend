const submit = document.getElementById("submit");

submit.addEventListener("click", async () => {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("psw").value;
  if (!firstName || !lastName || !email || !password) {
    alert("One requiere input is not filled in");
  }
  try {
    await fetch("/signup", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ firstName, lastName, age, email, password }),
    });
  } catch (error) {
    throw new Error(error);
  }
});

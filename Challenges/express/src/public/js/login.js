const login = document.getElementById("login");
const signup = document.getElementById("signup");

login.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("psw").value;
  if (!email || !password) window.location.href = "/login";
  try {
    const serverRes = await fetch("/login", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ email, password }),
    });
    if (serverRes.status === 200) window.location.href = "/";
    else {
      alert("Invalid credentials");
      window.location.href = "/login";
    }
  } catch (error) {
    throw new Error(error);
  }
});

github.addEventListener("click", () => {
  window.location.href = "http://localhost:8080/login/github";
});

signup.addEventListener("click", () => {
  window.location.href = "http://localhost:8080/signup";
});

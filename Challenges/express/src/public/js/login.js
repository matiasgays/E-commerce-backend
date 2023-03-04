const loginBtn = document.getElementById("login");

login.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("psw").value;
  try {
    const serverRes = await fetch("/login", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ email, password }),
    });
    if (serverRes.status === 201) {
      window.location.href = "/";
    } else {
      alert("Authetincation failed");
      window.location.href = "/login";
    }
  } catch (error) {
    throw new Error(error);
  }
});

github.addEventListener("click", () => {
  window.location.href = "http://127.0.0.1:8080/login/github";
});

const login = document.getElementById("login");

login.addEventListener("click", async () => {
  const uname = document.getElementById("uname").value;
  const psw = document.getElementById("psw").value;
  try {
    const serverRes = await fetch("/login", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ uname, psw }),
    });
    if (serverRes.status === 200) {
      window.location.href = "/private";
    } else if (serverRes.status === 404) {
      alert("Could not load user");
    }
  } catch (error) {
    throw new Error(error);
  }
});

const login = document.getElementById("login");
const para = document.getElementById("para");

login.addEventListener("click", async () => {
  const uname = document.getElementById("uname").value;
  const psw = document.getElementById("psw").value;
  try {
    const serverRes = await fetch("/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ uname, psw }),
    });
    if (serverRes.status === 200) {
      window.location.href = "/";
    } else if (serverRes.status === 401) {
      alert("Authetincation failed");
      window.location.href = "/login";
    }
  } catch (error) {
    throw new Error(error);
  }
});

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
      window.location.href = "/private";
    } else if (serverRes.status === 401) {
      window.location.href = "/login";
      alert("Authetincation failed");
    }
  } catch (error) {
    throw new Error(error);
  }
});

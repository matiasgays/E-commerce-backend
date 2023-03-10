const login = document.getElementById("login");
const para = document.getElementById("para");
const forgotPsw = document.getElementById("forgot-psw");

login.addEventListener("click", async (e) => {
  e.preventDefault();
  const uname = document.getElementById("uname").value;
  const psw = document.getElementById("psw").value;
  try {
    const serverRes = await fetch("/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ uname, psw }),
    });
    console.log(serverRes.status);
    if (serverRes.status === 200) {
      window.location.href = "/private";
    } else {
      window.location.href = "/login";
      alert("Authetincation failed");
    }
  } catch (error) {
    throw new Error(error);
  }
});

forgotPsw.addEventListener("click");

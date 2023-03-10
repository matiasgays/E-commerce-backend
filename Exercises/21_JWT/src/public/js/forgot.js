const reset = document.getElementById("reset");

reset.addEventListener("click", async () => {
  const uname = document.getElementById("uname").value;
  const psw = document.getElementById("psw").value;
  try {
    await fetch("/forgot", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ uname, psw }),
    });
    window.location.href = "/login";
    alert("User successfully updated");
  } catch (error) {
    throw new Error(error);
  }
});

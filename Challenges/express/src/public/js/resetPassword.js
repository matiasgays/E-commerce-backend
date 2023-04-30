const reset = document.getElementById("reset");

reset.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = "null";
  try {
    const serverRes = await fetch("/reset-password", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ email, password }),
    });
    if (serverRes.status === 200) window.location.href = "/login";
    alert("Email was sent to your email account to reset your password");
  } catch (error) {
    throw new Error(error);
  }
});

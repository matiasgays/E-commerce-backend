const reset = document.getElementById("reset");

const getCurrentURL = () => {
  return window.location.href;
};

const getToken = (url) => {
  const token = url.split("/");
  return token[token.length - 1];
};

reset.addEventListener("click", async () => {
  const password = document.getElementById("pwd").value;
  const url = getCurrentURL();
  const token = getToken(url);

  try {
    const serverRes = await fetch(`/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ password }),
    });
    console.log(serverRes.status);
    switch (serverRes.status) {
      case 200:
        window.location.href = "/login";
        alert("Password successfully updated");
        break;

      case 400:
        window.location.href = "/login";
        alert("Invalid token");
        break;

      case 403:
        window.location.href = "/reset-password";
        alert("Token expired");
        break;

      case 406:
        window.location.href = `/reset-password/${token}`;
        alert("New password must be different");
        break;
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getCookie = document.getElementById("getCookie");
const setCookie = document.getElementById("setCookie");

getCookie.addEventListener("click", async () => {
  const param = document.getElementById("cookies");
  try {
    const cookies = await fetch("/getCookie");
    param.innerHTML = `${cookies}`;
  } catch (error) {
    throw new Error(error);
  }
});

setCookie.addEventListener("click", async () => {
  const uname = document.getElementById("uname");
  const email = document.getElementById("psw");
  try {
    await fetch("/setCookie", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ uname: uname.value, email: email.value }),
    });
  } catch (error) {
    throw new Error(error);
  }
});

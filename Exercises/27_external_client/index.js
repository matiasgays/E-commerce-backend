async function request() {
  try {
    const response = await fetch("http://127.0.0.1:8080/test");
    const responseJSON = await response.json();
    console.log(responseJSON);
  } catch (error) {
    throw new Error(error);
  }
}

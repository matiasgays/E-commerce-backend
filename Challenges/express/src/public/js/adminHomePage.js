const user = document.getElementById("user");
const del = document.getElementById("delete");
const toggle = document.getElementById("toggle");

const url = getCurrentURL();
const uid = getUserId(url);

const userData = async () => {
  try {
    const serverRes = await fetch(`http://localhost:8080/api/users/admin`, {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ uid }),
    });
    const serverResJSON = await serverRes.json();
    const { firstName, lastName, email, age, role } = serverResJSON.payload;
    return (user.innerHTML = `
                            <div class="Ticket-Container">
                                <h3 class="firstName">firstName: ${firstName}</h1>
                                <h3 class="lastName">lastName: ${lastName}</h2>
                                <h3 class="email">email: ${email}</h3>
                                <h3 class="age">age: ${age}</h3>
                                <h3 class="role">role: ${role}</h3>
                            </div>
                                `);
  } catch (error) {
    throw new Error(error);
  }
};

del.addEventListener("click", async (e) => {
  try {
    const serverRes = await fetch(`http://localhost:8080/api/users/admin`, {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ uid }),
    });
    if (serverRes.status === 200) {
      window.location.href = "/admin";
    } else {
      alert("Could not delete user");
    }
  } catch (error) {
    throw new Error(error);
  }
});

toggle.addEventListener("click", async (e) => {
  try {
    const serverRes = await fetch(
      `http://localhost:8080/api/users/premium/${uid}`,
      {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
      }
    );
    if (serverRes.status === 200) {
      alert("User role updated successfully");
    } else {
      alert(
        "Could not update user. If user'role is 'USER' you should provide the required documents. If user'role is 'ADMIN' you are not allowed to update an admin role"
      );
    }
  } catch (error) {
    throw new Error(error);
  }
});

function getCurrentURL() {
  return window.location.href;
}

function getUserId(url) {
  const uid = url.split("/");
  return uid[uid.length - 1];
}

userData();

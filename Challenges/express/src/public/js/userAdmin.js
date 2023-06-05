const get = document.getElementById("get");
const del = document.getElementById("delete");

get.addEventListener("click", async (e) => {
  window.location.href = "/api/users/admin/json";
});

del.addEventListener("click", async (e) => {
  await fetch("/api/users", {
    method: "DELETE",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });
});

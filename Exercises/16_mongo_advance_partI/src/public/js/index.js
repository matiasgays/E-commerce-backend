const socket = io();
const std = document.getElementById("students");
const actualPage = document.getElementById("page");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
let user;

socket.on("students", (students) => {
  let messages = "";
  students.docs.forEach((student) => {
    messages =
      messages +
      `${student.name} - ${student.lastName} - ${student.email} - ${student.gender}</br>`;
  });
  std.innerHTML = messages;
  actualPage.innerHTML = students.page;
  students.hasPrevPage === false
    ? (prevPage.disabled = true)
    : (prevPage.disabled = false);

  students.hasNextPage === false
    ? (nextPage.disabled = true)
    : (nextPage.disabled = false);
});

socket.on("error", () => {
  actualPage.append("cannot go to prev page");
});

nextPage.addEventListener("click", () => {
  socket.emit("nextPage");
});

prevPage.addEventListener("click", () => {
  socket.emit("prevPage");
});

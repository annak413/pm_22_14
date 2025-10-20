document.addEventListener("DOMContentLoaded", () => {
  const firstName = "Laura";
  const lastName = "Anderson";

  const personName = document.querySelector(".person_name");

  if (personName) {
    personName.innerHTML = `${firstName}<b class="fw-bold">${lastName}</b>`;
  }
});

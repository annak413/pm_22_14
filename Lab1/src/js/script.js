document.addEventListener("DOMContentLoaded", () => {
  // 1. Підставлення імені користувача
  const personName = document.getElementById("personName");
  personName.textContent = "Анна Ковальчук"; // <-- своє ім’я

  // 2. Обробка кліку на стрілки
  const headers = document.querySelectorAll(".header");
  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const arrow = header.querySelector(".arrow");
      const content = header.nextElementSibling;

      content.classList.toggle("hidden");
      arrow.classList.toggle("rotate");
    });
  });

  // 3. Масиви даних
  const experience = [
    "Front-end стажування в компанії WebDev",
    "Розробка навчального сайту для університету",
    "Участь у хакатоні з JavaScript",
  ];

  const skills = [
    "HTML / CSS / JavaScript",
    "React.js / Node.js",
    "Git / GitHub / VS Code",
  ];

  // Функція для генерації списку
  function generateList(array, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // очищення
    array.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      container.appendChild(li);
    });
  }

  // Генеруємо контент
  generateList(experience, "experienceList");
  generateList(skills, "skillsList");
});

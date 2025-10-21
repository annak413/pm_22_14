document.addEventListener("DOMContentLoaded", () => {
  const firstName = "Laura";
  const lastName = "Anderson";

  const personName = document.querySelector(".person_name");

  if (personName) {
    personName.innerHTML = `${firstName}<b class="fw-bold">${lastName}</b>`;
  }

  const toggleButtons = document.querySelectorAll(".toggle-btn");

  toggleButtons.forEach((button) => {
    // 2. Прив'язуємо обробник події 'click'
    button.addEventListener("click", function () {
      // 3. Визначаємо цільовий контент (використовуючи data-target)
      const targetId = this.getAttribute("data-target");
      const content = document.getElementById(targetId);

      if (content) {
        // 4. Перемикаємо видимість контенту (додаємо/видаляємо службовий клас)
        // Видимість (collapse-content active)
        content.classList.toggle("active");

        // 5. Перемикаємо клас на кнопці (для зміни орієнтації стрілки)
        // Орієнтація стрілки (toggle-btn active)
        this.classList.toggle("active");
      }
    });
  });
});

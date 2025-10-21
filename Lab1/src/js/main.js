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

  const educationData = [
    {
      degree: "MASTER",
      specialization: "DESIGN WEB",
      period: "Jan 2007 - Dic 2009",
      institution: "University Of Lorem | Location",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam",
    },
    {
      degree: "BACHELORS",
      specialization: "OF ARTS",
      period: "Mar 2004 - Feb 2007",
      institution: "University Of Lorem | Location",
      description:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam .",
    },
  ];

  function renderTimeline(data, selector) {
    const container = document.querySelector(selector);

    if (!container) return;

    // 1. Очищення вмісту контейнера перед вставкою (як ви просили)
    container.innerHTML = "";

    // 2. Генерація розмітки, яка зберігає всі CSS-класи
    const htmlMarkup = data
      .map(
        (item) => `
                        <div class="inside_timeline">
                          <div class="timeline-item row g-0">
                            <div class="col-4">
                              <h4 class="fs-6 fw-semibold text-uppercase lh-base mb-1">
                                ${item.degree} <br />
                                ${item.specialization}
                              </h4>
                              <p class="fs-6 lh-base fw-semibold">${item.period}</p>
                            </div>
                            <div class="col-8 left">
                              <h5 class="fs-5 lh-base fw-semibold mb-0">
                                ${item.institution}
                              </h5>
                              <p class="fs-6">
                                ${item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      `
      )
      .join("");

    container.innerHTML = htmlMarkup;
  }

  renderTimeline(educationData, "#educationContent .timeline");
});

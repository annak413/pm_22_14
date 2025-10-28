document.addEventListener("DOMContentLoaded", () => {
  // const firstName = "Laura ";
  // const lastName = "Anderson";

  function loadData(url) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Помилка завантаження даних:", error);
        // Відображення службового повідомлення про помилку
        alert(
          "Помилка завантаження даних! Перевірте консоль та запуск через локальний сервер."
        );
        return null; // Повертаємо null у разі помилки
      });
  }

  function createTimelineItem(item) {
    // Властивість specialization є лише в education та references
    const specializationMarkup = item.specialization
      ? `${item.specialization} <br />`
      : "";

    // Властивість period є в experience та education, але пуста в references
    const periodMarkup = item.period
      ? `<p class="fs-6 lh-base fw-semibold">${item.period}</p>`
      : "";

    const phoneMarkup = item.phone
      ? `<p class="cont mb-1"><b class="fw-bold">Phone:</b> ${item.phone}</p>`
      : "";

    const emailMarkup = item.email
      ? `<p class="cont"><b class="fw-bold">Email:</b> <a href="mailto:${item.email}">${item.email}</a></p>`
      : "";

    return `
        <div class="inside_timeline">
            <div class="timeline-item row g-0">
                <div class="col-4">
                    <h4 class="fs-6 fw-bold text-uppercase lh-base mb-1">
                        ${item.degree} <br />
                        ${specializationMarkup}
                    </h4>
                    ${periodMarkup}
                </div>
                <div class="col-8 left">
                    <h5 class="fs-5 lh-base fw-semibold mb-0">
                        ${item.institution}
                    </h5>
                    <p class="fs-6 mb-2">
                        ${item.description}
                    </p>
                    <div class="d-flex gap-2">
                      <a href="tel:${item.phone}" class="text-decoration-none text-dark">${phoneMarkup}</a>
                      <a href="mail:${item.mail}" class="text-decoration-none text-dark">${emailMarkup}</a>
                    </div>
                </div>
            </div>
        </div>
    `;
  }

  function renderTimeline(data, selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    // Використовуємо createTimelineItem для кожного елемента
    const htmlMarkup = data.map(createTimelineItem).join("");
    container.innerHTML = htmlMarkup;
  }

  function renderList(dataArray, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Створюємо розмітку <ul> з елементами <li>
    const listMarkup = `
        <ul>
            ${dataArray
              .map((item) => `<li class="fw-6 lh-lg">${item}</li>`)
              .join("")}
        </ul>
    `;
    container.innerHTML = listMarkup;
  }

  loadData("../../data.json").then((data) => {
    if (!data) return;

    // Підстановка імені з полів firstName та lastName (було в JS)
    const personNameElement = document.querySelector(".person_name");
    if (personNameElement) {
      personNameElement.innerHTML = `${data.person.firstName} <b class="fw-bold">${data.person.lastName}</b>`;
    }

    // Підстановка Title та Greeting (було в about.html)
    const personTitleElement = document.querySelector(".title + p.fs-5"); // Елемент під ім'ям
    if (personTitleElement) {
      personTitleElement.textContent = data.person.title;
    }
    const greetingHeader = document.querySelector(".greating h3");
    if (greetingHeader) {
      greetingHeader.textContent = data.person.greeting;
    }

    // Рендеринг Контактів (було в sidebar.html)
    const contactElements = {
      phone: document
        .querySelector(".bi-telephone")
        .nextElementSibling.querySelector("a"),
      email: document
        .querySelector(".bi-envelope")
        .nextElementSibling.querySelector("a"),
      web: document
        .querySelector(".bi-globe")
        .nextElementSibling.querySelector("a"),
    };

    const socialLinks = data.social;

    if (socialLinks) {
      const socialListItems = document.querySelectorAll(".list-unstyled li");
      socialListItems.forEach((item) => {
        const networkName = item
          .querySelector("p")
          .textContent.toLowerCase()
          .trim();
        const linkData = socialLinks[networkName];
        const linkElement = item.querySelector("a");
        if (linkData && linkElement) {
          linkElement.textContent = linkData;
          // Встановлюємо повний URL (передбачаючи, що це зовнішнє посилання)
          linkElement.href = `https://${linkData}`;
          linkElement.target = "_blank"; // Відкривати у новому вікні
        }
      });
    }
    // Оновлення тексту та href для контактів
    contactElements.phone.textContent = data.contact.phone;
    contactElements.phone.href = `tel:${data.contact.phone.replace(/\s/g, "")}`; // Додаємо коректний href

    contactElements.email.textContent = data.contact.email;
    contactElements.email.href = `mailto:${data.contact.email}`; // Додаємо коректний href

    contactElements.web.textContent = data.contact.web;
    contactElements.web.href = `http://${data.contact.web}`; // Додаємо коректний href

    const professionalSkillsContainer = document.querySelector(
      "#professional-skills"
    );
    const technicalSkillsContainer =
      document.querySelector("#technical-skills");

    if (professionalSkillsContainer) {
      renderList(data.skills.professional, "#professional-skills");
    }

    if (technicalSkillsContainer) {
      renderList(data.skills.technical, "#technical-skills");
    }

    renderTimeline(data.education, "#educationContent .timeline");
    renderTimeline(data.experience, "#experienceContent .timeline");
    renderTimeline(data.references, "#referencesContent .timeline");

    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const content = document.getElementById(targetId);

        if (content) {
          content.classList.toggle("active");
          this.classList.toggle("active");
        }
      });
    });
  });

  // const personName = document.querySelector(".person_name");
});

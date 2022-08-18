import menuTemplate from "../template/menuTemplate.js";

const $ = (selector) => document.querySelector(selector);

function App() {
  const render = () => {
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuTemplate({
        name: $("#espresso-menu-name").value,
      })
    );
    $("#espresso-menu-name").value = "";
    const count = $("#espresso-menu-list").childElementCount;
    $(".menu-count").innerText = `총 ${count}개`;
  };

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      render();
    }
  });
}

const app = new App();

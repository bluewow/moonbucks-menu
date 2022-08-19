import menuTemplate from "../template/menuTemplate.js";

const $ = (selector) => document.querySelector(selector);

function App() {
  const render = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("빈값입니다");
      return;
    }

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuTemplate({
        name: $("#espresso-menu-name").value,
      })
    );
    $("#espresso-menu-name").value = "";
    updateCount();
  };

  const updateCount = () => {
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

  $("#espresso-menu-submit-button").addEventListener("click", (e) => {
    render();
  });

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      let menuName = e.target.closest("li").querySelector(".menu-name");
      const updatedMenuName = prompt(
        "메뉴 이름을 수정해 주세요",
        menuName.innerText
      );
      menuName.innerText = updatedMenuName;
      return;
    }
    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("메뉴를 삭제하시겠습니까?")) {
        e.target.closest("li").remove();
        updateCount();
      }
      return;
    }
  });
}

const app = new App();

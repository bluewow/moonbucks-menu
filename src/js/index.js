import menuTemplate from "../template/menuTemplate.js";

const $ = (selector) => document.querySelector(selector);
const store = {
  setStorage(item) {
    localStorage.setItem("menu", JSON.stringify(item));
  },

  getStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  this.menu = [];

  this.init = () => {
    render();
  };

  const render = () => {
    this.menu = store.getStorage();
    const template = this.menu
      .map((item, index) => menuTemplate(item, index))
      .join("");
    $("#espresso-menu-list").innerHTML = template;
    updateCount();
  };

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("빈값입니다");
      return;
    }

    const menuName = $("#espresso-menu-name").value;
    this.menu.push({ name: menuName });
    store.setStorage(this.menu);
    $("#espresso-menu-name").value = "";
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
      addMenuName();
      render();
    }
  });

  $("#espresso-menu-submit-button").addEventListener("click", (e) => {
    addMenuName();
    render();
  });

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      let menuName = e.target.closest("li").querySelector(".menu-name");
      const menuId = e.target.closest("li").dataset.menuId;
      const updatedMenuName = prompt(
        "메뉴 이름을 수정해 주세요",
        menuName.innerText
      );
      menuName.innerText = updatedMenuName;
      this.menu[menuId].name = updatedMenuName;
      store.setStorage(this.menu);
      return;
    }
    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("메뉴를 삭제하시겠습니까?")) {
        const menuId = e.target.closest("li").dataset.menuId;
        this.menu.splice(menuId, 1);
        store.setStorage(this.menu);

        e.target.closest("li").remove();
        updateCount();
      }
      return;
    }
  });
}

const app = new App();
app.init();

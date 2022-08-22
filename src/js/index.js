import menuTemplate from "../template/menuTemplate.js";

const $ = (selector) => document.querySelector(selector);
const store = {
  setStorage(category, item) {
    localStorage.setItem(category, JSON.stringify(item[category]));
  },

  getStorage(category) {
    return JSON.parse(localStorage.getItem(category));
  },
};

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = "espresso";

  this.init = () => {
    if (store.getStorage(this.currentCategory) != null) {
      this.menu.map();
      this.menu[this.currentCategory] = store.getStorage(this.currentCategory);
    }
    render();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
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
    this.menu[this.currentCategory].push({ name: menuName });
    store.setStorage(this.currentCategory, this.menu);
    $("#espresso-menu-name").value = "";
  };

  const updateCount = () => {
    const count = $("#espresso-menu-list").childElementCount;
    $(".menu-count").innerText = `총 ${count}개`;
  };

  const editButton = (e) => {
    let menuName = e.target.closest("li").querySelector(".menu-name");
    const menuId = e.target.closest("li").dataset.menuId;
    const updatedMenuName = prompt(
      "메뉴 이름을 수정해 주세요",
      menuName.innerText
    );
    if (updatedMenuName) {
      menuName.innerText = updatedMenuName;
      this.menu[menuId].name = updatedMenuName;
      store.setStorage(this.currentCategory, this.menu);
    }
  };

  const deleteButton = (e) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1);
      store.setStorage(this.currentCategory, this.menu);

      e.target.closest("li").remove();
      updateCount();
    }
  };

  const toggleButton = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[menuId].soldOut = !this.menu[menuId].soldOut;
    store.setStorage(this.currentCategory, this.menu);
    render();
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
      editButton(e);
      return;
    }
    if (e.target.classList.contains("menu-remove-button")) {
      deleteButton(e);
      return;
    }

    if (e.target.classList.contains("menu-sold-out-button")) {
      toggleButton(e);
      return;
    }
  });

  $("nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("cafe-category-name")) {
      this.currentCategory = e.target.dataset.categoryName;
      render();
      return;
    }
  });
}

const app = new App();
app.init();

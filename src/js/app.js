/*
에스프레소 메뉴판 만들기

TODO localStorage Read & Write
- [x] localStorage 에 데이터를 저장한다
- [x] 메뉴를 추가할때
- [x] 메뉴를 수정할때
- [x] 메뉴를 삭제할때
- [x] localStorage 에 데이터를 읽어온다

TODO 카테고리별 메뉴판 관리
- [x] 에스프레소 메뉴판 관리
- [x] 프라푸치노 메뉴판 관리
- [x] 블랜디드 메뉴판 관리
- [x] 티바나 메뉴판 관리
- [x] 디저트 메뉴판 관리

TODO 페이지 접근시 최초 데이터 Read & Rendering
- [x] 페이지에 최초로 로딩될때 localStorage 에 에스프레소 메뉴를 읽어온다
- [x] 에스프레소 메뉴를 페이지에 그려준다

- [x] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class 를 추가하여 상태를 변경한다
- [x] 품절 버튼을 추가한다
- [x] 품절 버튼을 클릭하면 localStorage 에 상태값이 저장된다
- [x] 품절 해당메뉴의 상태값이 페이지에 그려진다


*/
import menuTemplate from "../template/render.js";

const $ = (selector) => document.querySelector(selector);
const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
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
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    updateCount();
  };

  const addMenuName = () => {
    const menuName = $("#espresso-menu-name").value;
    if (menuName === "") {
      alert("값을 입력해 주세요");
      return;
    }

    this.menu[this.currentCategory].push({ name: menuName });
    store.setLocalStorage(this.menu);

    render();
    clearInputMenu();
    updateCount();
  };

  const updateMenu = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const menuId = e.target.closest("li").dataset.menuId;
    const updateMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    if (updateMenuName) {
      $menuName.innerText = updateMenuName;
      this.menu[this.currentCategory][menuId].name = updateMenuName;
      store.setLocalStorage(this.menu);
    }
  };

  const removeMenu = (e) => {
    if (confirm("삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      e.target.closest("li").remove();
      updateCount();
    }
  };

  const toggleMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  const render = () => {
    const data = store.getLocalStorage();
    if (data === null) return;

    const template = data[this.currentCategory]
      .map((item, index) => menuTemplate(item, index))
      .join("");
    $("#espresso-menu-list").innerHTML = template;
  };

  const updateCount = () => {
    const count = $("#espresso-menu-list").childElementCount;
    $(".menu-count").innerText = `총 ${count}개`;
  };

  const clearInputMenu = () => {
    $("#espresso-menu-name").value = "";
  };

  //Event binding
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenuName();
    }
  });

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenu(e);
      return;
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenu(e);
      return;
    }

    if (e.target.classList.contains("sold-out-button")) {
      toggleMenu(e);
      return;
    }
  });

  $("nav").addEventListener("click", (e) => {
    const categoryName = e.target.dataset.categoryName;
    if (categoryName == null) {
      return;
    }
    this.currentCategory = categoryName;
    $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
    render();
  });
}

const app = new App();
app.init();

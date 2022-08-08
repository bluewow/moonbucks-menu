/*
에스프레소 메뉴판 만들기

TODO 서버 요청
- [ ] 웹 서버를 띄운다
- [ ] 서버에 새로운 메뉴명을 추가될 수 있도록 요청한다
- [ ] 서버에 카테고리별 메뉴리스트를 불러온다
- [ ] 서버에 메뉴수정 요청
- [ ] 서버에 품절상태 토글 요청
- [ ] 서버에 메뉴가 삭제될 수 있도록 요청

리팩토링
- [ ] localStorage 에 저장하는 로직을 지운다
- [ ] fetch 비동기 api -> async await 

TODO 사용자 경험
- [ ] API 통신이 실패하는 경우에 대해 사용자가 알수있게 alert 처리
- [ ] 중복되는 메뉴는 추가할 수 없다


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

import menuTemplate from "../template/render.js";
import $ from "./util.js";

const addMenuName = () => {
  const menuName = $("#espresso-menu-name").value;
  if (menuName === "") {
    alert("값을 입력해 주세요");
    return;
  }

  $("#espresso-menu-list").insertAdjacentHTML(
    "beforeend",
    menuTemplate(menuName)
  );

  clearInputMenu();
  updateCount();
};

const updateMenu = (e) => {
  const updateMenuName = prompt(
    "메뉴명을 수정해 주세요",
    e.target.closest("li").querySelector(".menu-name").innerText
  );
  e.target.closest("li").querySelector(".menu-name").innerText = updateMenuName;
};

const removeMenu = (e) => {
  if (confirm("삭제하시겠습니까?")) {
    e.target.closest("li").remove();
  }
  updateCount();
};

const updateCount = () => {
  const count = $("#espresso-menu-list").childElementCount;
  $(".menu-count").innerText = `총 ${count}개`;
};

const clearInputMenu = () => {
  $("#espresso-menu-name").value = "";
};

export { addMenuName, updateCount, removeMenu, updateMenu };

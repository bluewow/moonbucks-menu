/*
에스프레소 메뉴판 만들기

TODO localStorage Read & Write
- [] localStorage 에 데이터를 저장한다
- [] localStorage 에 데이터를 읽어온다

TODO 카테고리별 메뉴판 관리
- [] 에스프레소 메뉴판 관리
- [] 프라푸치노 메뉴판 관리
- [] 블랜디드 메뉴판 관리
- [] 티바나 메뉴판 관리
- [] 디저트 메뉴판 관리

TODO 페이지 접근시 최초 데이터 Read & Rendering
- [] 페이지에 최초로 로딩될때 localStorage 에 에스프레소 메뉴를 읽어온다
- [] 에스프레소 메뉴를 페이지에 그려준다

- [] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class 를 추가하여 상태를 변경한다
- [] 품절 버튼을 추가한다
- [] 품절 버튼을 클릭하면 localStorage 에 상태값이 저장된다
- [] 품절 해당메뉴의 상태값이 페이지에 그려진다


*/
import { addMenuName, updateCount, removeMenu, updateMenu } from "./index.js";
import $ from "./util.js";

function App() {
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addMenuName();
    }
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenu(e);
      return;
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenu(e);
      return;
    }
  });
}

App();

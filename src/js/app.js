/*
에스프레소 메뉴판 만들기

요구사항 구현을 위한 요구사항 분석
TODO 메뉴 추가
- [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다
- [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다
- [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다
- [x] 총 메뉴 갯수를 count 하여 상단에 보여준다
- [x] 메뉴가 추가되고 나면 input 은 빈값으로 초기화한다
- [x] 사용자 입력값이 빈 값이라면 추가되지 않는다

TODO 메뉴 수정
- [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창(prompt)이 뜬다
- [x] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다

TODO 메뉴 삭제
- [x] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌(confirm) 모달창이 뜬다
- [x] 확인 버튼을 클릭하면 메뉴가 삭제된다
- [x] 총 메뉴 개수를 count 하여 상단에 보여준다
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

const menuTemplate = (item, index) =>
  `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name  
    ${item.soldOut ? "sold-out" : ""}">${item.name}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 sold-out-button"
  >
    품절
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>`;

export default menuTemplate;

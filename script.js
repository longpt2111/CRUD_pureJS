const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $(".form");
const basicSalary = $("#basic-salary");
const fullname = $("#fullname");
const department = $("#department");
const coeffitSalary = $("#coefficients-salary");
const saveInfoBtn = $("#save-info");
const updateInfoBtn = $("#update-info");
const table = $(".table");

const staffList = [
  {
    fullname: "Phạm Thành Long",
    department: "Kĩ sư phần mềm",
    coeffitSalary: 5,
  },
];

const basicSalaryValue = 2000000;
let selectedIndex = 0;

function renderInfo() {
  for (let i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  for (let i = 0; i < staffList.length; i++) {
    const newRow = table.insertRow(table.rows.length);

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.innerHTML = i + 1;
    cell2.innerHTML = staffList[i].fullname;
    cell3.innerHTML = staffList[i].department;
    cell4.innerHTML = staffList[i].coeffitSalary;
    cell5.innerHTML = (
      staffList[i].coeffitSalary * basicSalaryValue
    ).toLocaleString("en-US", { useGrouping: true });
    cell6.innerHTML = `
    <a href="javascript:void(0)" class="edit-btn" onclick="editInfo(this)">Sửa</a> / 
    <a href="javascript:void(0)" class="delete-btn" onclick="deleteInfo(this)">Xóa</a>
    `;
  }
  clearForm();
}

function saveInfo() {
  let staffInfo = {
    fullname: fullname.value,
    department: department.value,
    coeffitSalary: coeffitSalary.value,
  };
  staffList.push(staffInfo);
  renderInfo();
}

function editInfo(e) {
  let selectedRow = e.parentElement.parentElement;

  fullname.value = selectedRow.cells[1].innerText;
  department.value = selectedRow.cells[2].innerText;
  coeffitSalary.value = selectedRow.cells[3].innerText;

  selectedIndex = parseInt(selectedRow.cells[0].innerText) - 1;

  updateInfoBtn.classList.remove("hidden");
  saveInfoBtn.classList.add("hidden");
}

function updateInfo() {
  staffList[selectedIndex].fullname = fullname.value;
  staffList[selectedIndex].department = department.value;
  staffList[selectedIndex].coeffitSalary = coeffitSalary.value;
  renderInfo();

  updateInfoBtn.classList.add("hidden");
  saveInfoBtn.classList.remove("hidden");
}

function deleteInfo(e) {
  let selectedRow = e.parentElement.parentElement;
  selectedIndex = parseInt(selectedRow.cells[0].innerText) - 1;
  if (confirm("Bạn có muốn xóa dữ liệu nhân viên này không?")) {
    staffList.splice(selectedIndex, 1);
  }
  renderInfo();
}

function clearForm() {
  fullname.value = "";
  department.value = "";
  coeffitSalary.value = "";
}

basicSalary.value = basicSalaryValue.toLocaleString("en-US", {
  useGrouping: true,
});

form.addEventListener("submit", (e) => e.preventDefault());
saveInfoBtn.addEventListener("click", saveInfo);
updateInfoBtn.addEventListener("click", updateInfo);

renderInfo();

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $(".form");
const basicSalary = $("#basic-salary");
const fullname = $("#fullname");
const department = $("#department");
const coeffitSalary = $("#coefficients-salary");
const nameError = $(".fullname-error");
const departmentError = $(".department-error");
const coefficientsError = $(".coefficients-error");
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
    cell5.innerHTML = formatSalary(
      staffList[i].coeffitSalary * basicSalaryValue
    );
    cell6.innerHTML = `
    <a href="javascript:void(0)" class="edit-btn" onclick="editInfo(this)">Sửa</a> / 
    <a href="javascript:void(0)" class="delete-btn" onclick="deleteInfo(this)">Xóa</a>
    `;
  }
  clearForm();
}

function validateForm() {
  let isValid = true;
  if (!validateName()) isValid = false;
  if (!validateDepartment()) isValid = false;
  if (!validateCoeffitSalary()) isValid = false;
  return isValid;
}

function validateName() {
  if (fullname.value === "") {
    nameError.innerText = "Bạn chưa nhập tên đầy đủ";
    return false;
  } else {
    nameError.innerText = "";
  }
  return true;
}

function validateDepartment() {
  if (department.value === "") {
    departmentError.innerText = "Bạn chưa chọn phòng ban";
    return false;
  } else {
    departmentError.innerText = "";
  }
  return true;
}

function validateCoeffitSalary() {
  if (coeffitSalary.value === "") {
    coefficientsError.innerText = "Bạn chưa nhập hệ số lương";
    return false;
  } else {
    coefficientsError.innerText = "";
  }
  return true;
}

function clearForm() {
  fullname.value = "";
  department.value = "";
  coeffitSalary.value = "";
}

function saveInfo() {
  if (validateForm()) {
    let staffInfo = {
      fullname: fullname.value,
      department: department.value,
      coeffitSalary: coeffitSalary.value,
    };
    staffList.push(staffInfo);
    renderInfo();
  }
}

function editInfo(e) {
  let selectedRow = e.parentElement.parentElement;

  fullname.value = selectedRow.cells[1].innerText;
  department.value = selectedRow.cells[2].innerText;
  coeffitSalary.value = selectedRow.cells[3].innerText;

  selectedIndex = parseInt(selectedRow.cells[0].innerText) - 1;

  updateInfoBtn.classList.remove("hidden");
  saveInfoBtn.classList.add("hidden");
  validateForm();
}

function updateInfo() {
  if (validateForm()) {
    staffList[selectedIndex].fullname = fullname.value;
    staffList[selectedIndex].department = department.value;
    staffList[selectedIndex].coeffitSalary = coeffitSalary.value;
    renderInfo();

    updateInfoBtn.classList.add("hidden");
    saveInfoBtn.classList.remove("hidden");
  }
}

function deleteInfo(e) {
  let selectedRow = e.parentElement.parentElement;
  selectedIndex = parseInt(selectedRow.cells[0].innerText) - 1;
  if (confirm("Bạn có muốn xóa dữ liệu nhân viên này không?")) {
    staffList.splice(selectedIndex, 1);
  }
  renderInfo();
}

function showBasicSalary() {
  basicSalary.value = formatSalary(basicSalaryValue);
}

function formatSalary(value) {
  return value.toLocaleString("en-US", { useGrouping: true });
}

form.addEventListener("submit", (e) => e.preventDefault());
saveInfoBtn.addEventListener("click", saveInfo);
updateInfoBtn.addEventListener("click", updateInfo);
fullname.addEventListener("input", validateName);
department.addEventListener("input", validateDepartment);
coeffitSalary.addEventListener("input", validateCoeffitSalary);

showBasicSalary();
renderInfo();

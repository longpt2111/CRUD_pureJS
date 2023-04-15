const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $(".form");
const basicSalary = $("#basic-salary");
const fullname = $("#fullname");
const department = $("#department");
const coeffitSalary = $("#coefficients-salary");
const saveInfoBtn = $("#save-info");
const calSalaryBtn = $("#calculate-salary");
const updateInfoBtn = $("#update-info");
const table = $(".table");

let staffList = [
  {
    fullname: "Phạm Thành Long",
    department: "Kĩ sư phần mềm",
    coeffitSalary: 5,
  },
];

const basicSalaryValue = 2000000;

function renderInfo() {
  basicSalary.value = basicSalaryValue.toLocaleString("en-US", {
    useGrouping: true,
  });
  for (let i = 0; i < staffList.length; i++) {
    const newRow = table.insertRow(table.length);

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
    <a href="javascript:void(0)" id="edit-btn">Sửa</a> / 
    <a href="javascript:void(0)" id="delete-btn">Xóa</a>
    `;
  }
}

function saveInfo() {
  const staffInfo = {
    fullname: fullname.value,
    department: department.value,
    coeffitSalary: coeffitSalary.value,
  };
  staffList.push(staffInfo);
  renderInfo();
}

form.addEventListener("submit", (e) => e.preventDefault());
saveInfoBtn.addEventListener("click", saveInfo);

renderInfo();

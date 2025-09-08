function addDoctor() {
  const name = document.getElementById('docName').value.trim();
  const specialization = document.getElementById('docSpecialization').value.trim();
  const qualification = document.getElementById('docQualification').value.trim();
  const experience = document.getElementById('docExperience').value.trim();
  const age = document.getElementById('docAge').value.trim();

  if (!name || !specialization || !qualification || !experience || !age) {
    alert("Please fill all fields!");
    return;
  }

  const table = document.getElementById('doctorTable').getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${name}</td>
    <td>${specialization}</td>
    <td>${qualification}</td>
    <td>${experience}</td>
    <td>${age}</td>
    <td>
      <button class ="color" onclick="editRow(this)">Edit</button>
      <button class ="colorfile" onclick="deleteRow(this)">Delete</button>
    </td>
  `;

  document.getElementById('docName').value = '';
  document.getElementById('docSpecialization').value = '';
  document.getElementById('docQualification').value = '';
  document.getElementById('docExperience').value = '';
  document.getElementById('docAge').value = '';
}

function deleteRow(button) {
  button.closest('tr').remove();
}

function editRow(button) {
  const row = button.closest('tr');
  const cells = row.getElementsByTagName('td');

  const name = prompt("Edit Name:", cells[0].innerText);
  const specialization = prompt("Edit Specialization:", cells[1].innerText);
  const qualification = prompt("Edit Qualification:", cells[2].innerText);
  const experience = prompt("Edit Experience:", cells[3].innerText);
  const age = prompt("Edit Age:", cells[4].innerText);

  if (name && specialization && qualification && experience && age) {
    cells[0].innerText = name;
    cells[1].innerText = specialization;
    cells[2].innerText = qualification;
    cells[3].innerText = experience;
    cells[4].innerText = age;
  }
}

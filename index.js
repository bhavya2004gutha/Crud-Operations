 const rowsPerPage = 3;
  let currentPage = 1;
  let doctors = [];

  function saveToLocalStorage() {
    localStorage.setItem('doctorsData', JSON.stringify(doctors));
  }

  function loadFromLocalStorage() {
    const stored = localStorage.getItem('doctorsData');
    doctors = stored ? JSON.parse(stored) : [];
  }

  function renderTable() {
    const tbody = document.querySelector('#doctorTable tbody');
    tbody.innerHTML = '';

  
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageDoctors = doctors.slice(start, end);

    if (pageDoctors.length === 0 && currentPage > 1) {
      
      currentPage--;
      return renderTable();
    }

    for (const doc of pageDoctors) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${doc.name}</td>
        <td>${doc.specialization}</td>
        <td>${doc.qualification}</td>
        <td>${doc.experience}</td>
        <td>${doc.age}</td>
        <td>
          <button class="color" onclick="editRow(${doctors.indexOf(doc)})">Edit</button>
          <button class="colorfile" onclick="deleteRow(${doctors.indexOf(doc)})">Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    }

    renderPaginationButtons();
  }

  function renderPaginationButtons() {
    const container = document.getElementById('paginationControls');
    const totalPages = Math.ceil(doctors.length / rowsPerPage) || 1;
    container.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    };
    container.appendChild(prevBtn);

   
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable();
      }
    };
    container.appendChild(nextBtn);

    const pageInfo = document.createElement('span');
    pageInfo.style.marginLeft = '10px';
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    container.appendChild(pageInfo);
  }

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

    doctors.push({ name, specialization, qualification, experience, age });
    saveToLocalStorage();

  
    document.getElementById('docName').value = '';
    document.getElementById('docSpecialization').value = '';
    document.getElementById('docQualification').value = '';
    document.getElementById('docExperience').value = '';
    document.getElementById('docAge').value = '';

    currentPage = Math.ceil(doctors.length / rowsPerPage);
    renderTable();
  }

  function deleteRow(index) {
    if (confirm('Are you sure you want to delete this doctor?')) {
      doctors.splice(index, 1);
      saveToLocalStorage();
      renderTable();
    }
  }

  function editRow(index) {
    const doc = doctors[index];
    const name = prompt("Edit Name:", doc.name);
    if (!name) return;
    const specialization = prompt("Edit Specialization:", doc.specialization);
    if (!specialization) return;
    const qualification = prompt("Edit Qualification:", doc.qualification);
    if (!qualification) return;
    const experience = prompt("Edit Experience:", doc.experience);
    if (!experience) return;
    const age = prompt("Edit Age:", doc.age);
    if (!age) return;

    doctors[index] = { name, specialization, qualification, experience, age };
    saveToLocalStorage();
    renderTable();
  }

 
  window.onload = function () {
    loadFromLocalStorage();
    renderTable();
  };

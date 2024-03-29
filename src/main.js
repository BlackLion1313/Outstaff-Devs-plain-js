const apiUrl = 'https://randomuser.me/api/?results=25';

async function fetchUsers() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.log('error', error);
  }
}

async function functionsController() {
  try {
    const users = await fetchUsers();
    createListWithUsers(users);
    createDropDown(users);
    setEventListeners(users);
    filterByDropDown(users);
  } catch (error) {
    console.log('error', error);
  }
}
functionsController();

const createListWithUsers = (users) => {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  users.forEach((user, i) => {
    if (isInDropdown(user) && isInput(user) && isGenderRadio(user)) {
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        openModal(users[i]);
      });
      const tableH = document.createElement('th');
      tableH.scope = 'row';
      tableH.innerText = i + 1;
      const tdFirstName = createTableCell(user.name.first);
      const tdLastName = createTableCell(user.name.last);
      const tdAge = createTableCell(user.dob.age);
      const tdEmail = createTableCell(user.email);
      const tdPhone = createTableCell(user.cell);
      const tdCity = createTableCell(user.location.city);
      const tdState = createTableCell(user.location.state);
      const tdCountry = createTableCell(user.location.country);

      appendCellsToRow(row, [tableH, tdFirstName, tdLastName, tdAge, tdEmail, tdPhone, tdCity, tdState, tdCountry]);
      tbody.appendChild(row);
    }
  });
};

const createTableCell = (value) => {
  const td = document.createElement('td');
  td.innerText = value;
  return td;
};

const appendCellsToRow = (row, cells) => {
  cells.forEach(cell => {
    row.appendChild(cell);
  });
};

function createDropDown(users) {
  const citySelect = document.getElementById('city');
  const cities = users.map(user => user.location.city);
  const uniqueCity = [...new Set(cities)];

  uniqueCity.forEach(city => {
    const optionCity = document.createElement('option');
    optionCity.innerText = city;
    optionCity.value = city;
    citySelect.appendChild(optionCity);
  });
}

const setEventListeners = (users) => {
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
    select.addEventListener('change', () => {
      createListWithUsers(users);
    });
  });

  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    createListWithUsers(users);
  });

  const genderRadios = document.querySelectorAll('input[type="radio"][name="genderFilter"]');
  genderRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      createListWithUsers(users);
    });
  });
};


function openModal(user) {
  const modalContent = document.getElementById('modal-body');
  modalContent.innerHTML = `
    <h2 class='text-center'> ${user.name.first} ${user.name.last}</h2>
    <img class='img-fluid' src="${user.picture.large}" alt="user picture"></img>
  `;
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';

  const closeModal = document.getElementById('close');
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

function writeEmail() {
  const emailLink = document.getElementById('email');
  emailLink.addEventListener('click', () => {
    window.location.href = "mailto:recipient@example.com";
  });
}
writeEmail();

const isInDropdown = (user) => {
  const selectedOptionCity = document.getElementById('city').value;
  return selectedOptionCity === user.location.city || selectedOptionCity === 'all';
};

const isInput = (user) => {
  const searchInputValue = document.getElementById('searchInput').value.toLowerCase();
  const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
  return fullName.includes(searchInputValue);
};

const isGenderRadio = (user) => {
  const genderRadios = document.querySelector('input[type="radio"][name="genderFilter"]:checked').value;
  return genderRadios === 'all' || user.gender === genderRadios;
};

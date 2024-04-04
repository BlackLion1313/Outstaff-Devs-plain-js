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
    onOfTheme()
  } catch (error) {
    console.log('error', error);
  }
}
functionsController();

const createListWithUsers = (users) => {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';

  let usersFound = false;

  users.forEach((user, i) => {
    if (isInDropdown(user) && isInput(user) && isGenderRadio(user)) {
      usersFound = true;

      const row = document.createElement('tr');

      row.setAttribute('data-bs-toggle', 'tooltip');
      row.setAttribute('data-bs-placement', 'top');
      row.setAttribute('title', 'click to see more details');
      row.classList.add('pointer');

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

  if (!usersFound) {
    document.getElementById('noResultsMessage').style.display = 'block';
  } else {
    document.getElementById('noResultsMessage').style.display = 'none';
  }

  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
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
const onOfTheme = () => {
  const btn = document.getElementById('theme_btn');
  const body = document.body;
  const modalContent = document.querySelector('.modal-content');
  const navbar = document.querySelector('.navbar');
  const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const table = document.querySelector('.table');
  const searchTools = document.querySelector('.container.bg-secondary');

  btn.addEventListener('click', () => {
    if (body.classList.contains('bg-dark')) {
      body.classList.remove('bg-dark', 'text-light');
      body.classList.add('bg-light', 'text-dark');
      navbar.classList.remove('bg-secondary');
      navbar.classList.add('bg-light');
      table.classList.remove('table-dark');
      searchTools.classList.remove('bg-secondary');
      searchTools.classList.add('bg-light');

      navbarLinks.forEach(link => {
        link.classList.remove('text-light');
        link.classList.add('text-dark');
      });

      modalContent.classList.remove('bg-dark', 'text-light');
      modalContent.classList.add('bg-light', 'text-dark');
    } else {
      body.classList.remove('bg-light', 'text-dark');
      body.classList.add('bg-dark', 'text-light');
      navbar.classList.remove('bg-light');
      navbar.classList.add('bg-secondary');
      table.classList.add('table-dark');
      searchTools.classList.remove('bg-light');
      searchTools.classList.add('bg-secondary');

      navbarLinks.forEach(link => {
        link.classList.remove('text-dark');
        link.classList.add('text-light');
      });

      modalContent.classList.remove('bg-light', 'text-dark');
      modalContent.classList.add('bg-dark', 'text-light');
    }
  });
}

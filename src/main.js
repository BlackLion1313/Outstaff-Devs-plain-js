
const apiUrl = 'https://randomuser.me/api/?results=10';

async function fetchUsers() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result.results

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
  } catch (error) {
    console.log('error', error)
  }

}

functionsController();

function createListWithUsers(users) {
  const tbody = document.getElementById('tbody')
  tbody.innerHTML = '';

  for (let i = 0; i < users.length; i++) {
    const row = document.createElement('tr');
    row.addEventListener('click', () => {
      openModal(users[i])
    })
    const tableH = document.createElement('th');
    tableH.scope = 'row';
    tableH.innerText = i + 1
    const tdFirstName = document.createElement('td');
    const tdLastName = document.createElement('td');
    const tdLocation = document.createElement('td');
    tdFirstName.innerText = users[i].name.first
    tdLastName.innerText = users[i].name.last
    tdLocation.innerText = users[i].location.city

    tbody.appendChild(row)
    row.appendChild(tableH)
    row.appendChild(tdFirstName)
    row.appendChild(tdLastName)
    row.appendChild(tdLocation)


  }

}

function createDropDown(users) {
  const genderSelect = document.getElementById('gender');
  const countrySelect = document.getElementById('country');

  const genders = users.map((user) => {
    return user.gender
  })

  const countries = users.map((user) => {

    return user.location.country
  })
  console.log('countries', countries)

  const uniqueGender = [...new Set(genders)];
  console.log('uniqueGender', uniqueGender)

  const uniqueCountry = [... new Set(countries)]
  console.log('uniqueCountry', uniqueCountry)

  uniqueGender.forEach((gender) => {
    const optionGender = document.createElement('option');
    optionGender.innerText = gender;
    optionGender.value = gender;
    genderSelect.appendChild(optionGender);
  })

  uniqueCountry.forEach((country) => {
    const optionCountry = document.createElement('option');
    optionCountry.innerText = country;
    optionCountry.value = country;
    countrySelect.appendChild(optionCountry);

  })

}


const setEventListeners = (users) => {
  document.querySelector('select').addEventListener('change', (event) => {
    filterByDropDown(users)
  })
}

function filterByDropDown(users) {
  const selectedOptionGender = document.getElementById('gender').value;
  if (selectedOptionGender === 'all') {
    createListWithUsers(users);
  } else {
    const filteredGender = users.filter((user) => {
      return user.gender === selectedOptionGender;
    });

    createListWithUsers(filteredGender);
  }

  const selectedOptionCountry = document.getElementById('country').value;
  if (selectedOptionCountry === 'all') {
    createListWithUsers(users);
  } else {
    const filteredCountry = users.filter((user) => {
      return user.location.country === selectedOptionCountry;
    });

    createListWithUsers(filteredCountry);
  }
}

function openModal(user) {
  const modalContent = document.getElementById('modal-body')

  modalContent.innerHTML = `
    <h2 class= 'text-center'> ${user.name.first} ${user.name.last}</h2>
    <img class = 'img-fluid'  src = "${user.picture.large}" alt="user picture"></img>
  `;
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';

  const closeModal = document.getElementById('close');
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';

  })


}


function writeEmail() {
  document.getElementById('email').addEventListener('click', () => {
    window.location.href = "mailto:recipient@example.com";
  })

}
writeEmail();





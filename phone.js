function loadPhones(phoneName,dataLimit) {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data,dataLimit));
}

function displayPhone(phones,dataLimit) {
    console.log(phones);
    const phoneContainer = document.getElementById('phone_container');
    phoneContainer.textContent = '';
    const notFound = document.getElementById('no-message-found');
    const showAll = document.getElementById('showAll');

    if (dataLimit && phones.length > dataLimit) {
        phones = phones.slice(0, dataLimit);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    if (phones.length == 0) {
        notFound.classList.remove('d-none');
    } else {
        notFound.classList.add('d-none');
        for (const phone of phones) {
            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('col');
            phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.slug}</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Phone Details</button>
                </div>
            </div>
            `;
            phoneContainer.appendChild(phoneDiv);
        }
    }
    showToggle(false);
}

function loadPhoneDetails(id) {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
}

function displayPhoneDetails(details) {
    console.log(details);
    
    const phone_title = document.getElementById('exampleModalLabel');
    phone_title.innerText = details.name;
    document.getElementById('storage').innerText = details.mainFeatures.storage;
    document.getElementById('memory').innerText = details.mainFeatures.memory;
    document.getElementById('display').innerText = details.mainFeatures.displaySize;

    const info = document.getElementById('info');
    const div1 = document.createElement('div');
    div1.innerHTML = `
    <img src="${details.image}" alt="">
    `;
    info.appendChild(div1);
}

function showToggle(b) {
    const toggle = document.getElementById('loader');
    if (b) {
        toggle.classList.remove('d-none');
    } else {
        toggle.classList.add('d-none');
    }
}

const process = (dataLimit) => {
    showToggle(true);
    const inputField = document.getElementById('search-field').value;
    loadPhones(inputField,dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    process(10);
})

document.getElementById('search-field').addEventListener('keypress', function (e){
    if (e.key == 'Enter') {
        process(10);
    }
})

document.getElementById('showAll').addEventListener('click', function () {
    process();
})
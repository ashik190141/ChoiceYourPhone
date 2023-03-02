function loadData(category) {
    const uri = `https://forbes400.onrender.com/api/forbes400/industries/${category}`
    fetch(uri)
    .then(res => res.json())
    .then(data => display(data));
}
function display(data) {
    for (const d of data) {
        console.log(d);
    }
    const starContainer = document.getElementById('star_container');
    starContainer.textContent=''
    for (const d of data) {
        const bios = d.bios;
        let str = "";
        for (let i = 0; i < bios.length; i++){
            str += bios[i];
        }
        const div1 = document.createElement('div');
        div1.classList.add('col');
        div1.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${d.squareImage}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${d.personName}</h5>
                <p class="card-text">City: ${d.city}</p>
                <p class="card-text">Rank: ${d.rank}</p>
                <a onclick="personDetails('${d.personName}','${d.state}','${d.countryOfCitizenship}','${str.replace(/[']/g, '')}','${d.squareImage}','${d.gender}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</a>
            </div>
        </div>
        `;
        starContainer.appendChild(div1);
    }
    showToggle(false);
}

function personDetails(name, state, citizen, bio, img, gender) {
    document.getElementById('exampleModalLabel').innerText = name;
    document.getElementById('bio').innerText = bio;
    document.getElementById('citizenship').innerText = citizen;
    document.getElementById('state').innerText = state;
    document.getElementById('gender').innerText = gender;

    const info = document.getElementById('modal-img');
    info.textContent = '';
    const div1 = document.createElement('div');
    div1.innerHTML = `
    <img src="${img}" alt="" class="img-fluid">
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
document.getElementById('technologies').addEventListener('click', function () {
    showToggle(true);
    loadData('technology');
})
document.getElementById('fashion').addEventListener('click', function () {
    showToggle(true);
    loadData('fashion');
})
document.getElementById('finance').addEventListener('click', function () {
    showToggle(true);
    loadData('finance');
})
document.getElementById('investments').addEventListener('click', function () {
    showToggle(true);
    loadData('investments');
})
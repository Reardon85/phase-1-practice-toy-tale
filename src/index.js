document.addEventListener('DOMContentLoaded', init)
let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Initiate a fetch on all the toys from db.Json and calls renderToys to render them into he DOM
function init() {
  const toyForm = document.querySelector('.add-toy-form');

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyForm.name.value,
        "image": toyForm.image.value,
        "likes": 0
      })
    })
      .then((resp) => resp.json())
      .then((data) => renderToy(data));
    toyForm.reset();
  })


  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then((data) => data.forEach(renderToy))

}


// Pulls individual toy Obj then renders the information in it onto a div.card and updates DOM
function renderToy(toyObj) {
  const collectionDiv = document.getElementById('toy-collection');
  const cardDiv = document.createElement('div');
  const toyName = document.createElement('h2');
  const toyImg = document.createElement('img');
  const toyLikes = document.createElement('p');
  const toyBtn = document.createElement('button');

  cardDiv.className = 'card'
  toyImg.className = 'toy-avatar'
  toyBtn.className = 'like-btn'
  toyBtn.id = '[toy_id]'

  toyName.textContent = toyObj.toyName;
  toyImg.src = toyObj.image;
  toyLikes.textContent = `${toyObj.likes} Likes`;
  toyBtn.textContent = 'Like ❤️';

  cardDiv.append(toyName, toyImg, toyLikes, toyBtn);
  collectionDiv.appendChild(cardDiv);

  toyBtn.addEventListener('click', () => {

    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": ++toyObj.likes, 
      })
    })
    .then( toyLikes.textContent = `${toyObj.likes} Likes`)
  })
}
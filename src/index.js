// Globle Variables //
let addToy = false;
let URL = `http://localhost:3000/toys` 

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection");
  const toyForm = document.querySelector('.add-toy-form')
  const likeBtn = document.querySelector('.like-btn')

// fetch // name toy
function fetchToys(){
  fetch(URL)
  .then(response => response.json())
  .then(toysData => toysData.forEach(toy => renderToyCard(toy)))
}


fetchToys()

  // Rnders//

  function renderToyCard(toy){
    
    let toyName = toy.name
    let toyImage = toy.image
    let toyLikes = toy.likes

    const cardDiv = document.createElement('div')
    cardDiv.setAttribute("class", "card")
    cardDiv.setAttribute("data-set-id",toy.id)
    const cardName = document.createElement('h2')
    const cardImg = document.createElement('img')
    cardImg.setAttribute("src", toyImage)
    cardImg.setAttribute("class", "toy-avatar")

    const cardlikes = document.createElement('p')
    const cardButton = document.createElement('button')
    cardButton.setAttribute("class", "like-btn")

    cardName.innerText = toyName
    cardlikes.innerText = `${toyLikes} Likes`
    cardButton.innerText = "Like"

    cardDiv.append(cardName, cardImg, cardlikes, cardButton)
    toyCollection.appendChild(cardDiv)  

  }

  function formInput(e){
    e.preventDefault()
    let toyName = e.target.name.value
    let toyImage = e.target.image.value
    fetch(URL, {
      method: "POST",
      "headers": {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyName,
        "image": toyImage,
        "likes": 0
      })
    })
    .then(response => response.json())
    .then(toysData => toysData.forEach(toy => renderToyCard(toy)))
  }

  function increaseLikes(e){
    // e.preventDefault()
    const card = e.target.closest('div.card')
   if (e.target.className === "like-btn"){
      let likeP = card.querySelector('p')
      let likes = parseInt(likeP.textContent)
        let newLikes = likes += 1
        let toyId = card.dataset.setId
        console.log(toyId)
      fetch(`${URL}/${toyId}`, {
        method: "PATCH",
        "headers": {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": newLikes
        }),
        
      })
            .then(response => response.json())
            .then(data => {likes.textContent = `${data.likes} likes`})
            
    }

  }


  

  // Event //
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyForm.addEventListener("submit", formInput) 

  toyCollection.addEventListener("click", increaseLikes)

});





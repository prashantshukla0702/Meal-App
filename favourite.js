let catalog = document.querySelector('.meal-catalog .row'); // element to show the meal catalog.

function openNav() {
    document.getElementById("mySidenav").style.width = "50%"; // show navbar in half of the screen
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0"; // hide navbar 
}

window.onload = () => { // this function will display indian meals on home page catalog.
    renderFavFood();
}
function getFavBtn() {
    let favBtn = document.getElementsByClassName("favBtn"); // get all the favourite buttons.
    let favourites = localStorage.getItem('favourites'); // Array to store the favourite meal. 
    for (let i = 0; i < favBtn.length; i++) {
        favBtn[i].onclick = function (e) {
            removefromFavrourite(favourites, e);
        }
    }
}

async function renderFavFood() {
    catalog.innerHTML = ''; catalog.innerHTML = '';
    let favourites = localStorage.getItem('favourites'); // Array to store the favourite meal. 
    let favMeals = JSON.parse(favourites); // storing a meal array into a  variable.
    favMeals.map(async (foodID) => {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + foodID); // Fetch the meal details using meal-id.
        let food = await res.json();
        let column = document.createElement('div');
        column.classList.add('col-md-4'); // create a column to show meal card.
        column.innerHTML = `<div class="meal-card">
              <img src="${food.meals[0].strMealThumb}" class="meal-img" />
              <div class="meal-info-wrapper">
                <div class="meal-title">${food.meals[0].strMeal}</div>
                <div class="rating">
                  <i class="fa">&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;</i>
                </div>
              </div>
              <div class="card-overlay">
                <i data-id="${food.meals[0].idMeal}" class="fa fa-heart favBtn active"></i>
                <a href="./detail.html?mealID=${food.meals[0].idMeal}">
                <p class="text-light">View Full recipe</p></a>
              </div>`;
        catalog.append(column); // add each column into a row after generating meal card  
    });

    setTimeout(getFavBtn, 1000);
}

function removefromFavrourite(favouriteArr, e) {
    let mealID = e.target.dataset.id;
    favouriteArr = JSON.parse(favouriteArr); // convert string into an array.
    let newfavouriteArr = favouriteArr.filter((id) => { // removing the meal id from from favourite list.
        return id != mealID
    });
    e.target.classList.remove('active');
    localStorage.setItem('favourites', JSON.stringify(newfavouriteArr)); // change the value of favourites in localstorage after removing a meal id from array.
    renderFavFood();
}
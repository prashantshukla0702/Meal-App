let queryInput = document.getElementById('keyword'); // get the value of input field.
let foodList = Array(); // Array to store the meal list.
let favourites = Array(); // Array to store the favourite meal.
let list = document.getElementById('foodlist'); // element to show the search result.
let catalog = document.querySelector('.meal-catalog .row'); // element to show the meal catalog.

function openNav() {
    document.getElementById("mySidenav").style.width = "50%"; // show navbar in half of the screen
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0"; // hide navbar 
}

window.onload = async () => { // this function will display indian meals on home page catalog.
    let catalogData = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
    let data = await catalogData.json();
    renderFoodCatalog(data);
    getFavBtn();

}
function getFavBtn() {
    let favBtn = document.getElementsByClassName("favBtn"); // get all the favourite buttons.

    for (let i = 0; i < favBtn.length; i++) {
        favBtn[i].onclick = function (e) {
            addtoFavourite(e);
        }
    }
}
queryInput.addEventListener('keyup', async (e) => { // function to perform search operation.
    var queryFood = e.target.value;
    if (queryFood !== '') {
        try {
            let res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + queryFood);
            let data = await res.json(); // to convert the response into json format
            // foodList = data;
            renderFoodList(data);
        } catch (error) {
            console.log('Error:', error);
        }
    } else {
        foodList = [];
        document.getElementById('foodlist').classList.remove('show'); // Hide the list div
        renderFoodList(foodList);
    }
});

function renderFoodList(foodList) {

    list.innerHTML = '';
    let foodarray = foodList.meals;
    let favouriteArr = localStorage.getItem('favourites');
    if (foodarray?.length > 0) { // this checks if the array is empty or if a value exists and greater than 0. 
        document.getElementById('foodlist').classList.add('show'); // show the list div
        foodarray.map((food) => {
            let li = document.createElement('li');
            li.innerHTML = `<img src="${food.strMealThumb}" height="50px" width="50px">
                            <a href="./detail.html?mealID=${food.idMeal}"><span>${food.strMeal}</span></a>
                            <div class="btnContainer">
                            <i class="fa fa-heart favBtn ${(favouriteArr?.includes(food.idMeal)) ? "active" : ""}" data-id="${food.idMeal}"></i>
                            </div>`;
            list.append(li);
        });
    }
    getFavBtn();


}
function renderFoodCatalog(data) {
    catalog.innerHTML = '';
    let indianCuisine = data.meals; // storing a meal array into a  variable
    let favouriteArr = localStorage.getItem('favourites');
    indianCuisine.map((food) => {
        let column = document.createElement('div');
        column.classList.add('col-md-4'); // create a column to show meal card
        column.innerHTML = `<div class="meal-card">
              <img src="${food.strMealThumb}" class="meal-img" />
              <div class="meal-info-wrapper">
                <div class="meal-title">${food.strMeal}</div>
                <div class="rating">
                  <i class="fa">&#xf005;&#xf005;&#xf005;&#xf005;&#xf005;</i>
                </div>
              </div>
              <div class="card-overlay">
                <i data-id="${food.idMeal}" class="fa fa-heart favBtn ${(favouriteArr?.includes(food.idMeal)) ? "active" : ""}"></i>
                <a href="./detail.html?mealID=${food.idMeal}">
                <p class="text-light">View Full recipe</p></a>
              </div>`;
        catalog.append(column); // add each column into a row after generating meal card  
    });

}

function addtoFavourite(e) {

    let mealID = e.target.dataset.id; // retrieving the value of data-id of clicked element.
    let favouriteArr = localStorage.getItem('favourites'); // retrieving value of favourites from localstorage.
    if (favouriteArr !== null) {
        if (!favouriteArr.includes(mealID)) {
            favouriteArr = JSON.parse(favouriteArr); // convert string into an array.
            favouriteArr.push(mealID);
            e.target.classList.add('active'); // make favourite button active.
            localStorage.setItem('favourites', JSON.stringify(favouriteArr)); // change the value of favourites in localstorage after pushing new id.
        } else {
            e.target.classList.remove('active');
            removefromFavrourite(favouriteArr, mealID);
        }
    } else {
        favourites.push(mealID);
        e.target.classList.add('active')
        localStorage.setItem('favourites', JSON.stringify(favourites)); // set favourites array in localstorage.
    }
}

function removefromFavrourite(favouriteArr, mealID) {
    favouriteArr = JSON.parse(favouriteArr); // convert string into an array.
    let newfavouriteArr = favouriteArr.filter((id) => { // removing the meal id from from favourite list.
        return id != mealID
    });
    localStorage.setItem('favourites', JSON.stringify(newfavouriteArr)); // change the value of favourites in localstorage after removing a meal id from array.
}


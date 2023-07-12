function openNav() {
    document.getElementById("mySidenav").style.width = "50%"; // Show navbar
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0"; // Hide Navbar
}
async function fetchDetails() {
    let params = new URLSearchParams(window.location.search);
    let mealID = params.get('mealID');  // Get the value of mealID from url
    try {
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealID); // Fetch the meal details using meal-id  
        let data = await res.json();
        food_details = data;
        renderDetails(food_details);
    } catch (error) {
        console.error('Error:', error);
    }

}

function renderDetails(food_details) {
    details = food_details.meals;
    let foodInfo = document.getElementById('food-info'); // Element to show the meal image and ingredients.
    let foodDesc = document.getElementById('food-desc'); // Element to show Instructions.

    foodInfo.innerHTML = `
        <div class="row">
          <div class="col-md-5">
            <img src="${details[0].strMealThumb}" alt="${details[0].strMeal}" />
          </div>
          <div class="col-md-7">
            <div class="meal-name">${details[0].strMeal}</div>
            <ul id="ingredeints"></ul>
          </div>`;

    foodDesc.innerHTML = `<h2>Instructions</h2>
        <p>${details[0].strInstructions}</p>`;


    let ingredients = document.getElementById('ingredeints'); // Element to add the list of ingredients.
    ingredients.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
        if (details[0]['strIngredient' + i] !== "") {
            let li = document.createElement('li');
            ingredeintName = details[0]['strIngredient' + i];
            ingredeintQty = details[0]['strMeasure' + i];
            li.innerHTML = ingredeintName + ' : ' + ingredeintQty;
            ingredients.append(li);
        }
    }
}

window.onload = () => {
    fetchDetails();  // Fetch the meal details on page load.
}
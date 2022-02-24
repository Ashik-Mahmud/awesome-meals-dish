/* 
TODO:
-
-
-
-
-
-
-
*/


/* step 1 selection all of elements  */
const mealWrapper = document.getElementById('meal-wrapper');
const searchField = document.getElementById('searchTerms');


/* step 2 create a function for loading sample dish from meal db  */
const loadMeal = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
        .then(response => response.json())
        .then(meals => displayMeals(meals.meals))
};


/* step 3 for get a dish by search result  */

const searchMeal = (event) =>{
    let mealTerms = event.target.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealTerms}`)
    .then(response => response.json())
    .then(meals => displayMeals(meals.meals))
}

searchField.addEventListener('input', searchMeal);



/* step 4 display meals of my UI  */
const displayMeals = (meals) => {
    mealWrapper.textContent = '';
    if(!meals){
        mealWrapper.previousElementSibling.innerHTML = `<h1 style="margin: 8rem 0rem;">We will not found your desire Dish</h1>`;
    }else{
        mealWrapper.previousElementSibling.innerHTML = ``;
    meals.forEach((meal) => {
        mealWrapper.innerHTML += `
                        <div class="card">
                            <img src="${meal.strMealThumb}" alt="meal ${meal.strTags} images">
                            <div class="details">
                                <h3 class="my-2 h4">${meal.strMeal} from ${meal.strArea}</h3>
                                <span class='category'>${meal.strCategory}</span>
                                <p class="desc mb-0">${meal.strInstructions.substr(0, 90)}</p>
                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="see-more" onclick="mealDetails(${meal.idMeal})">Details</button>
                            </div>
                        </div>`;
    });       
}
}

/* step 5 for load meal details  */
const mealDetails = (mealID) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(response => response.json())
    .then(mealDetail => displayMealDetails(mealDetail.meals[0]))
}

/* step 6 display meal details */
const displayMealDetails = (meal)=>{
    console.log(meal)
    const modalContent = document.getElementById('modal-content');
    let {strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5} = meal;
    let {strIngredient1, strIngredient2, strIngredient3, strIngredient4,strIngredient5} = meal;
    modalContent.innerHTML = `
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">${meal.strMeal} from ${meal.strArea}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" ></button>
                        </div>
                        <div class="modal-body">
                            <img class="img-fluid w-100 " style="height:200px;object-fit:cover;" src="${meal.strMealThumb}" alt="meal ${meal.strTags} images">
                            <div class="my-2 bg-light p-2 rounded-1 d-flex align-items-center justify-content-between">
                                <p class="m-0 fw-bold text-dark">Measure</p>
                                <div class="d-flex flex-wrap align-items-center">
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strMeasure1}</small>
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strMeasure2}</small>
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strMeasure3}</small>
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strMeasure4}</small>
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strMeasure5}</small>
                                </div>
                            </div>
                            <div class="my-2 bg-light p-2 rounded-1 d-flex align-items-center justify-content-between">
                                <p class="m-0 fw-bold text-dark">Ingredients</p>
                                <div class="d-flex flex-wrap align-items-center">
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strIngredient1}</small>
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strIngredient2}</small>
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strIngredient3}</small>
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strIngredient4}</small>
                                    <small class="p-2 d-block rounded-1 bg-white m-1 shadow-sm">${strIngredient5}</small>
                                </div>
                            </div>
                            <p>${meal.strInstructions.slice(0, 400)} get a more details see the video tutorial</p>
                        </div>
                        <div class="modal-footer d-flex align-items-center justify-content-between">
                            <div class="tags d-flex align-items-center">
                                <strong>Tags: </strong>  ${meal.strTags ? meal.strTags : ' Not available'}
                            </div>
                            <div>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <a href=" ${meal.strYoutube}" target="_blank" type="button" class="btn btn-primary">Youtube Tutorial</a>
                            </div>
                        </div>`;
}





/*  calling all of global function  */
loadMeal();
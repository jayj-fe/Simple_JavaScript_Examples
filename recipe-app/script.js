"use strict"

const mealsEl = document.getElementById('meals');
const favMeals = document.getElementById('favMeals');
const searchTerm = document.getElementById('searchTerm');
const searchBtn = document.getElementById('searchBtn');
const popup = document.getElementById('popup-container');
const closePopup = document.getElementById('close-popup');
const mealInfo = document.getElementById('meal-info');


getRandomMeal();
fetchFavMeal();

async function getRandomMeal(){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];
    console.log(randomMeal);
    
    addMeal(randomMeal, true);
}

async function getMealById(id){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const respData = await resp.json();
    const meal = respData.meals[0];

    return meal;
}

async function getMealsBySearch(term){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+term);
    const respData = await resp.json();
    console.log(respData);
    const meal = respData.meals !== null ? respData.meals : null;

    return meal;
}

function addMeal(mealData, random = false){
    const meal = document.createElement('div');

    // console.log(mealData);

    meal.classList.add('meal');

    meal.innerHTML = `        
        <div class="meal-header">
            ${random ? `
                <span class="random">
                    Random Recipe
                </span>`
                :
                '' }
            <img 
                src="${mealData.strMealThumb}" 
                alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button type="button" class="fav-btn">
                <i class="fa-solid fa-heart"></i>
            </button>
        </div>
    `;

    const btn = meal.querySelector('.fav-btn');

    btn.addEventListener('click', (e)=>{

        if(btn.classList.contains('active')){
            btn.classList.remove('active');
            removeMealLS(mealData.idMeal);
        }else{
            btn.classList.add('active');
            addMealLS(mealData.idMeal);
        }

        fetchFavMeal();
    });

    meal.querySelector('img').addEventListener('click', (e) => {
        popupMealInfo(mealData);
    })

    mealsEl.appendChild(meal);
}

function addMealLS(mealId){
    const mealIds = getMealLS();
    
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId){
    const mealIds = getMealLS();
    
    localStorage.setItem('mealIds', JSON.stringify(
        mealIds.filter( (id) => { return id !== mealId }))
    )
}

function getMealLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeal(){
    favMeals.innerHTML = "";
    const mealIds = getMealLS();
    
    for(let i = 0; i < mealIds.length; i++){
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);

        addMealFav(meal);
    }

    // console.log(mealIds);
}

function addMealFav(mealData){
    const favMeal = document.createElement('li');

    favMeal.innerHTML = `
        <img 
            src="${mealData.strMealThumb}" 
            alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button type="button" class="clear"><i class="fa-solid fa-xmark"></i></button>
    `;

    const btn = favMeal.querySelector('.clear');

    btn.addEventListener('click', (e)=>{
        removeMealLS(mealData.idMeal);
        fetchFavMeal();
    });

    favMeal.querySelector('img').addEventListener('click', (e) => {
        popupMealInfo(mealData);
    })

    favMeals.appendChild(favMeal);
}


searchBtn.addEventListener('click', async () => {
    const search = searchTerm.value;

    mealsEl.innerHTML = '';
    
    const meals = await getMealsBySearch(search);
    // console.log(meals);
    if(meals !== null){
        meals.forEach((meal) => {
            addMeal(meal);
        })
    }else{
        alert('No Data');
    }
});

function popupMealInfo(mealData){
    mealInfo.innerHTML = "";

    console.log(mealData);
    const meal = document.createElement('div');
    const ingredients = [];

    for(let i = 1; i <= 20 ; i++ ){
        if(mealData["strIngredient" + i]){
            ingredients.push(`${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`);
        }else{
            break;
        }
    }

    meal.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>
            ${mealData.strInstructions}
        </p>
        <ul>
            ${ingredients.map((e) => `<li>${e}</li>`).join("")}
        </ul>
    `;

    mealInfo.append(meal);
    popup.classList.remove('hidden');
}

closePopup.addEventListener('click', () => {
    mealInfo.innerHTML = '';
    popup.classList.add('hidden');
})
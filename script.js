let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
inputValue=document.getElementById('search-box');
searchBtn=document.getElementById('search-btn');
closeBtn=document.getElementById('close-btn');
mealList=document.querySelector('.mealList');
mealInfocontianer=document.querySelector('.mealInfocontianer');

//search button to search for meallist of items
searchBtn.addEventListener('click',getMealList);

mealInfocontianer.addEventListener('click',(e) => {
    if(e.target.classList.contains('close-btn')){
        mealInfocontianer.style.display="none";
        console.log("close")
    }
});

//for getting information of [specific meal item]
mealList.addEventListener('click',getMealInfo);

let main=document.getElementById("main");

//using fetch to get information of mealList related to item
function getMealList(){
    //fetch details from server using fetch api command
    fetch(url+inputValue.value).then(res => res.json()).then(data => {
        
        showDetails(data.meals);
        console.log(data.meals[0]);
    })
}

//displaying details of mealList 
function showDetails(results){

    let html="";
    results.forEach(element => {
        const {strMeal,strMealThumb,idMeal,strArea}=element;
        html+=`
        <div class="mealItem">
            <div><img src="${strMealThumb}"></div>
            <div class="region"><h3>${strMeal}</h3><h4>${strArea}</h4></div>
            <div id="${idMeal}"><button class="show-recipe">Get</button></div>
        </div>
        `
    });
    main.innerHTML=(html);
}


//getting and displying information of particulr meal item
function getMealInfo(e){
    e.preventDefault();
    if(e.target.classList.contains("show-recipe")){
        id=e.target.parentElement.id;
        let url_id="https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
        //fetch details from server using fetch api command
        fetch(url_id+id).then(res => res.json()).then(data => {
            showInfo(data.meals[0]);
            console.log(data);
        });
    }
}

function showInfo(results){

    let html="";
    mealInfocontianer.innerHTML=`
    <div class="mealInfo">
        <div><img src="${results.strMealThumb}"></div>
        <div><h3>${results.strMeal}</h3><h4>${results.strCategory}</h4></div>
        <div class="description">${results.strInstructions}</div>
        <div style="margin:20px;"><a href="">Watch Video</a></div>
        <button class="close-btn">close</button>
    </div>    
    `;
    mealInfocontianer.style.display="block";
}

//serach by letter to get list of recipes
searchLetter=document.getElementById('search-letter');
searchLetter.addEventListener('click',getRandomList);
function getRandomList(){
    //fetch details from server using fetch api command
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f="+inputValue.value).then(res => res.json()).then(data => {
        showDetails(data.meals);
        console.log(data);
    })
}







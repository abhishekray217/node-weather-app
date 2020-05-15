console.log("Application started!");

//http://api.openweathermap.org/data/2.5/weather?lat=20&lon=20&appid=7a820c84d8723b5d35c0355f6e4ce02d

//http://puzzle.mead.io/puzzle

const weatherForm = document.querySelector("form");

const search = document.querySelector("input");


weatherForm.addEventListener("submit",(event)=>{

    event.preventDefault();
    
    const location =search.value;

    document.querySelector(".error").textContent = "Loading..."
    document.querySelector(".data-1").textContent = "";
    document.querySelector(".data-2").textContent = "";

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.querySelector(".error").textContent = data.error;
            } else {
                document.querySelector(".error").textContent = "";
                document.querySelector(".data-1").textContent = "The place you have searched for is located in " + data.location;
                document.querySelector(".data-2").textContent = data.forecast;
            }
        })
    })
})
/* DOM ELEMENTS -------------------------------------------------------------- */
const loginForm = document.querySelector("#login-form")
const loginFormUsername = document.querySelector('#username')
const body = document.querySelector('body')
const headerH1 = document.querySelector('h1')
const main = document.querySelector('main')
const formLabel = document.querySelector('#form-label')
const listingsButton = document.querySelector('#listings-button')



/* EVENT HANDLERS -------------------------------------------------------------- */

listingsButton.addEventListener('click', evt => {
    main.innerHTML = ""
    headerH1.textContent = "Instrument Listings"

    fetchAllListings()
})



/* RENDER FUNCTIONS ------------------------------------------------------------ */

function renderOneListing(instrumentObject) {
    // picture_url, year, brand, model, type 
    const instrumentDiv = document.createElement("div")
    const instrumentImg = document.createElement("img")
    const instrumentP = document.createElement("p")

    instrumentImg.src = instrumentObject.picture_url
    instrumentP.textContent = `${instrumentObject.year} ${instrumentObject.brand} ${instrumentObject.model} ${instrumentObject.type_of}`

    instrumentDiv.append(instrumentImg, instrumentP)
    main.append(instrumentDiv)
}



/* FETCH FUNCTIONS -------------------------------------------------------------- */

function fetchAllListings() {
    fetch("http://localhost:3000/api/v1/listings")
        .then(response => response.json())
        .then(listingsObjects => {
            const availableListings = listingsObjects.filter(listing => listing.buyer_id === 0)
            availableListings.forEach(listing => {
                fetch(`http://localhost:3000/api/v1/instruments/${listing.instrument_id}`)
                    .then(response => response.json())
                    .then(instrumentObject => {
                        renderOneListing(instrumentObject)
                    })
            })
        })
}


/* INITIAL RENDER ------------------------------------------------------------------ */
const logInComponent = new LogInComponent(loginForm)
logInComponent.submitFormEvent()






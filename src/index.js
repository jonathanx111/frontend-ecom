/* DOM ELEMENTS -------------------------------------------------------------- */
const main = document.querySelector('main')
const body = document.querySelector('body')
const headerH1 = document.querySelector('h1')
const loginForm = document.querySelector("#login-form")
const formLabel = document.querySelector('#form-label')
const loginFormUsername = document.querySelector('#username')
const listingsButton = document.querySelector('#listings-button')
// const homeButton = document.querySelector('#user-home')
const navBar = document.querySelector("#navigation-bar")
const navBarUl = document.querySelector(".navbar-ul")

/* APP DOM ELEMENTS -------------------------------------------------------------------- */

const instrumentUl = document.createElement('ul')
instrumentUl.id = "instrument-ul"

const newInstrumentFormDiv = document.createElement('div')
const newInstrumentForm = document.createElement('form')

/* EVENT HANDLERS -------------------------------------------------------------- */

navBar.addEventListener('click', evt => {
    if (evt.target.matches("#user-home")) {
        console.log("home button has been clicked")
        
    } else if (evt.target.matches("#listings-button")) {
        main.innerHTML = ""
        headerH1.textContent = "Instrument Listings"
        fetchAllListings()
    }

})

// instrumentUl.addEventListener('click', evt => {
//     if(evt.target.matches(".instrument-li")) {
//         console.log(evt.target)
    //     main.innerHTML = ""
    //     headerH1.textContent = `${this.instrumentObj.year} ${this.instrumentObj.brand} ${this.instrumentObj.model}`

    //     const instrumentShowPageDiv = document.createElement("div")
    //     instrumentShowPageDiv.id = "instrument-show-page-div"

    //     const instImg = document.createElement("img")
    //     instImg.src = this.instrumentObj.picture_url
    //     instImg.id = "instrument-img"

    //     const instYearP = document.createElement("p")
    //     instYearP.textContent = "Year: " + this.instrumentObj.year

    //     const instBrandP = document.createElement("p")
    //     instBrandP.textContent = "Brand: " + this.instrumentObj.brand

    //     const instModelP = document.createElement("p")
    //     instModelP.textContent = "Model: " + this.instrumentObj.model

    //     const instConditionP = document.createElement("p")
    //     instConditionP.textContent = "Condition: " + this.instrumentObj.condition

    //     const instPriceP = document.createElement("p")
    //     instPriceP.textContent = "Price: " + this.instrumentObj.price
//     }
// })





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

function renderNewInstrumentForm(newUserId) {
    const instrumentYear = document.createElement('input')
    const instrumentBrand = document.createElement('input')
    const instrumentModel = document.createElement('input')
    const instrumentTypeOf = document.createElement('input')
    const instrumentCondition = document.createElement('input')
    const instrumentPrice = document.createElement('input')
    const instrumentPictureUrl = document.createElement('input')

    newInstrumentForm.id = "new-instrument-form"
    newInstrumentForm.dataset.userId = newUserId

    instrumentYear.id = "year"
    instrumentYear.type = "number"
    instrumentYear.placeholder = "Year"
    instrumentYear.setAttribute("required", "")

    instrumentBrand.id = "brand"
    instrumentBrand.type = "text"
    instrumentBrand.placeholder = "Brand"
    instrumentBrand.setAttribute("required", "")

    instrumentModel.id = "model"
    instrumentModel.type = "text"
    instrumentModel.placeholder = "Model"
    instrumentModel.setAttribute("required", "")

    instrumentTypeOf.id = "typeof"
    instrumentTypeOf.type = "text"
    instrumentTypeOf.placeholder = "Type"
    instrumentTypeOf.setAttribute("required", "")

    instrumentCondition.id = "condition"
    instrumentCondition.type = "text"
    instrumentCondition.placeholder = "Condition"
    instrumentCondition.setAttribute("required", "")

    instrumentPrice.id = "price"
    instrumentPrice.type = "number"
    instrumentPrice.placeholder = "Price"
    instrumentPrice.setAttribute("required", "")

    instrumentPictureUrl.id = "url"
    instrumentPictureUrl.type = "text"
    instrumentPictureUrl.placeholder = "Picture URL"
    instrumentPictureUrl.setAttribute("required", "")

    const instrumentSubmit = document.createElement('input')
    instrumentSubmit.type = "submit"
    instrumentSubmit.value = "Submit"

    newInstrumentForm.append(instrumentYear, instrumentBrand, instrumentModel, instrumentTypeOf, instrumentCondition, instrumentPrice, instrumentPictureUrl, instrumentSubmit)

    newInstrumentFormDiv.append(newInstrumentForm)
    main.append(newInstrumentFormDiv)

    const instrumentFormComponent = new NewInstrumentFormComponent(newInstrumentFormDiv)
    instrumentFormComponent.addNewInstrumentEvent()
}

function renderSellerShowPage(userId) {

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

function fetchOneUserAndInstruments(userId) {
    fetch(`http://localhost:3000/api/v1/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        user.instruments.forEach(inst => {
            console.log(inst)
            main.innerHTML = ""
            const instrumentShowComponent = new InstrumentShowComponent(inst)
            instrumentShowComponent.createInstrumentLi()
            
            // const li = document.createElement('li')
            // li.classList.add("instrument-li")
            // li.textContent = `${inst.year} ${inst.brand} ${inst.model} ${inst.type_of}`
            // const instrumentShowComponent = new InstrumentShowComponent(inst)
            // instrumentShowComponent.createInstrumentLi()
            // instrumentUl.append(li)
        })
        const instrumentDiv = document.createElement('div')
        const instrumentDivTitle = document.createElement('h3')

        instrumentDiv.id = "instrument-div"
        instrumentDivTitle.textContent = "Currently Selling"

        instrumentDiv.append(instrumentDivTitle, instrumentUl)
        main.append(instrumentDiv)
        
        renderNewInstrumentForm(userId)
    })  
}

/* INITIAL RENDER ------------------------------------------------------------------ */
const logInComponent = new LogInComponent(loginForm)
logInComponent.submitFormEvent()

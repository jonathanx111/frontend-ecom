class InstrumentShowComponent {
    constructor(instrumentObj) {
        this.instrumentObj = instrumentObj
    }

    createInstrumentLi() {
        const li = document.createElement('li')
        li.classList.add("instrument-li")
        li.textContent = `${this.instrumentObj.year} ${this.instrumentObj.brand} ${this.instrumentObj.model} ${this.instrumentObj.type_of}`
        this.addLiClickEvent(li)
        instrumentUl.append(li)
    }

    addLiClickEvent(li) {
        li.addEventListener('click', evt => {
            main.innerHTML = ""
            headerH1.textContent = `${this.instrumentObj.year} ${this.instrumentObj.brand} ${this.instrumentObj.model}`

            const instrumentShowPageDiv = document.createElement("div")
            instrumentShowPageDiv.id = "instrument-show-page-div"

            const instImg = document.createElement("img")
            instImg.src = this.instrumentObj.picture_url
            instImg.id = "instrument-img"

            const instYearP = document.createElement("p")
            instYearP.textContent = "Year: " + this.instrumentObj.year

            const instBrandP = document.createElement("p")
            instBrandP.textContent = "Brand: " + this.instrumentObj.brand

            const instModelP = document.createElement("p")
            instModelP.textContent = "Model: " + this.instrumentObj.model

            const instConditionP = document.createElement("p")
            instConditionP.textContent = "Condition: " + this.instrumentObj.condition

            const instPriceP = document.createElement("p")
            instPriceP.textContent = "Price: " + this.instrumentObj.price

            const deleteInstrumentButton = document.createElement('button')
            deleteInstrumentButton.textContent = "Delete Instrument"
            this.addDeleteInstrumentButtonEvent(deleteInstrumentButton, this.instrumentObj.user_id)

            instrumentShowPageDiv.append(instImg, instYearP, instBrandP, instModelP, instConditionP, instPriceP, deleteInstrumentButton)

            main.append(instrumentShowPageDiv)
        })
    }

    addDeleteInstrumentButtonEvent(deleteInstrumentButton, userId) {
        deleteInstrumentButton.addEventListener('click', evt => {
            fetch(`http://localhost:3000/api/v1/instruments/${this.instrumentObj.id}`, {
                method: "DELETE"
            })
            // main.innerHTML = ""
            // headerH1.textContent = `Welcome Back, User!`
            // fetchOneUserAndInstruments(userId)
            // fetch(`http://localhost:3000/api/v1/users/${userId}`)
            // .then(response => response.json())
            // .then(user => {
            //     user.instruments.forEach(inst => {
            //         console.log(user.instruments)
            //         const li = document.createElement('li')
            //         li.textContent = `${inst.year} ${inst.brand} ${inst.model} ${inst.type_of}`
            //         const instrumentShowComponent = new InstrumentShowComponent(inst)
            //         this.createInstrumentLi()
            //         instrumentUl.append(li)
            //     })
            main.innerHTML = ""
            headerH1.textContent = `Welcome Back, User!`
            fetchOneUserAndInstruments(userId)
        })
    }


}  /* end of class */
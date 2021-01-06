class InstrumentShowComponent {
    constructor(instrumentObj) {
        this.instrumentObj = instrumentObj
    }

    createLi(instrumentUl) {
        const li = document.createElement('li')
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
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(console.log('hi'))
            // headerH1.textContent = `Welcome Back, ${this.username.charAt(0).toUpperCase() + this.username.slice(1)}!`
            main.innerHTML = ""
            fetch(`http://localhost:3000/api/v1/users/${userId}`)
                .then(response => response.json())
                .then(user => {
                    const instrumentUl = document.createElement('ul')
                    instrumentUl.id = "instrument-ul"
                    user.instruments.forEach(inst => {
                        console.log(user.instruments)
                        // const li = document.createElement('li')
                        // li.textContent = `${inst.year} ${inst.brand} ${inst.model} ${inst.type_of}`
                        // const instrumentShowComponent = new InstrumentShowComponent(inst)
                        this.createLi(instrumentUl)

                        // instrumentUl.append(li)
                    })
                    const instrumentDiv = document.createElement('div')
                    const instrumentDivTitle = document.createElement('h3')

                    instrumentDivTitle.textContent = "Currently Selling"

                    instrumentDiv.append(instrumentDivTitle, instrumentUl)
                    main.append(instrumentDiv)

                    const newInstrumentFormDiv = document.createElement('div')
                    const newInstrumentForm = document.createElement('form')
                    const instrumentYear = document.createElement('input')
                    const instrumentBrand = document.createElement('input')
                    const instrumentModel = document.createElement('input')
                    const instrumentTypeOf = document.createElement('input')
                    const instrumentCondition = document.createElement('input')
                    const instrumentPrice = document.createElement('input')
                    const instrumentPictureUrl = document.createElement('input')

                    newInstrumentForm.id = "new-instrument-form"
                    newInstrumentForm.dataset.userId = user.id

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
                })
        })
    }



}
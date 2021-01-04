class NewInstrumentFormComponent {
    constructor(formDiv) {
        this.formDiv = formDiv
        this.form = this.formDiv.querySelector("form")
    }

    createForm(user) {
        // const newInstrumentFormDiv = document.createElement('div')
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

        this.formDiv.append(newInstrumentForm)
        main.append(this.formDiv)
    }

    addNewInstrumentEvent() {
        this.form.addEventListener("submit", evt => {
            evt.preventDefault()
            fetch(`http://localhost:3000/api/v1/instruments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    year: this.form.year.value,
                    brand: this.form.brand.value,
                    model: this.form.model.value,
                    type_of: this.form.typeof.value,
                    condition: this.form.condition.value,
                    price: this.form.price.value,
                    picture_url: this.form.url.value,
                    user_id: this.form.dataset.userId
                })
            })
                .then(resp => resp.json())
                .then(newInstrumentObj => {
                    const instrumentUl = document.querySelector('#instrument-ul')
                    const li = document.createElement('li')
                    li.textContent = `${newInstrumentObj.year} ${newInstrumentObj.brand} ${newInstrumentObj.model} ${newInstrumentObj.type_of}`
                    instrumentUl.append(li)
                })
        })
    }

}




class RenderUserComponent {
    constructor(objects, form) {
        this.userObjects = objects
        this.form = form
        this.username = this.form.username.value
    }

    findUserId() {
        const userObjectsUsernameArray = this.userObjects.map(userObject => userObject.username)

        const userIndex = (userObjectsUsernameArray.indexOf(this.username))
        const userId = this.userObjects[userIndex].id
        return userId
    }

    displayUserInfo(userId) {
        main.innerHTML = ""
        headerH1.textContent = `Welcome Back, ${this.username.charAt(0).toUpperCase() + this.username.slice(1)}!`

        fetch(`http://localhost:3000/api/v1/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                const instrumentUl = document.createElement('ul')
                instrumentUl.id = "instrument-ul"
                user.instruments.forEach(inst => {
                    // const li = document.createElement('li')
                    // li.textContent = `${inst.year} ${inst.brand} ${inst.model} ${inst.type_of}`
                    const instrumentShowComponent = new InstrumentShowComponent(inst)
                    instrumentShowComponent.createLi(instrumentUl)
                    
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
    
}
}
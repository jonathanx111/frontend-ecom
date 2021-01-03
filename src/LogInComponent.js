class LogInComponent {
    constructor(form) {
        this.form = form
    }

    submitFormEvent() {
        const handleFormEvent = event => {
            event.preventDefault()
            console.log("submit form")

            this.checkExistence()
        }

        // Event Listener
        this.form.addEventListener('submit', handleFormEvent)
    }

    checkExistence() {
        fetch("http://localhost:3000/api/v1/users")
            .then(response => response.json())
            .then(userObjects => {
                const userObjectsUsernameArray = userObjects.map(userObject => userObject.username)
                const username = this.form.username.value
                if (userObjectsUsernameArray.includes(username)) {
                    const userIndex = (userObjectsUsernameArray.indexOf(username))
                    const userId = userObjects[userIndex].id
                    console.log("yes")
                    loginForm.remove()
                    headerH1.textContent = `Welcome Back, ${username.charAt(0).toUpperCase() + username.slice(1)}!`

                    fetch(`http://localhost:3000/api/v1/users/${userId}`)
                        .then(response => response.json())
                        .then(user => {
                            const instrumentUl = document.createElement('ul')
                            user.instruments.forEach(inst => {
                                const li = document.createElement('li')
                                li.textContent = `${inst.year} ${inst.brand} ${inst.model} ${inst.type_of}`
                                instrumentUl.append(li)
                            })
                            const instrumentDiv = document.createElement('div')
                            const instrumentDivTitle = document.createElement('h3')

                            instrumentDivTitle.textContent = "Instruments"

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

                            instrumentYear.id = "instrument-year"
                            instrumentYear.type = "number"
                            instrumentYear.placeholder = "Year"

                            instrumentBrand.id = "instrument-brand"
                            instrumentBrand.type = "text"
                            instrumentBrand.placeholder = "Brand"

                            instrumentModel.id = "instrument-model"
                            instrumentModel.type = "text"
                            instrumentModel.placeholder = "Model"

                            instrumentTypeOf.id = "instrument-type-of"
                            instrumentTypeOf.type = "text"
                            instrumentTypeOf.placeholder = "Type"

                            instrumentCondition.id = "instrument-condition"
                            instrumentCondition.type = "text"
                            instrumentCondition.placeholder = "Condition"

                            instrumentPrice.id = "instrument-price"
                            instrumentPrice.type = "number"
                            instrumentPrice.placeholder = "Price"

                            instrumentPictureUrl.id = "instrument-picture-url"
                            instrumentPictureUrl.type = "text"
                            instrumentPictureUrl.placeholder = "Picture URL"

                            const instrumentSubmit = document.createElement('input')
                            instrumentSubmit.type = "submit"
                            instrumentSubmit.value = "Submit"

                            newInstrumentForm.append(instrumentYear, instrumentBrand, instrumentModel, instrumentTypeOf, instrumentCondition, instrumentPrice, instrumentPictureUrl, instrumentSubmit)

                            newInstrumentFormDiv.append(newInstrumentForm)

                            main.append(newInstrumentFormDiv)
                        })
                } else {
                    console.log("no")
                    // 1) "Username does not exist, would you like to create a new user" 
                    // If no {resets login form, and retype username} => yes option
                    // If yes {Creates new user with username just typed} => step 2
                    // 2) Render header "Welcome ${username}!"k
                }
            })
    }


}





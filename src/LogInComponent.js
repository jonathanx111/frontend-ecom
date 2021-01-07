class LogInComponent {
    constructor(form) {
        this.form = form
    }

    submitFormEvent() {
        this.form.addEventListener('submit', event => {
            event.preventDefault()
            
            this.checkExistence()
        })
    }

    checkExistence() {
        const username = this.form.username.value

        fetch("http://localhost:3000/api/v1/users")
            .then(response => response.json())
            .then(allUserObjects => {
                const usernameArray = allUserObjects.map(userObject => userObject.username)
                // const username = this.form.username.value
                if (usernameArray.includes(username)) {
                    const renderUserComponent = new RenderUserComponent(allUserObjects, this.form)
                    const userId = renderUserComponent.findUserId()
                    renderUserComponent.displayUserInfo(userId)
                } else {
                    console.log("no")
                    const submitButton = document.getElementById("submit-button")
                    submitButton.remove()

                    const noSignupButton = document.createElement('button')
                    noSignupButton.textContent = "No"
                    const yesSignupButton = document.createElement('button')
                    yesSignupButton.textContent = "Yes"
                    const errorP = document.createElement('p')
                    errorP.textContent = "Username does not exist - Would you like to signup with that username?" 

                    errorP.append(yesSignupButton, noSignupButton)
                    main.prepend(errorP)

                    noSignupButton.addEventListener('click', event => {
                        errorP.remove()
                        loginForm.append(submitButton)
                        loginForm.reset()
                    })

                    yesSignupButton.addEventListener('click', signupButtonEvent => {
                        signupButtonEvent.preventDefault()
                        fetch("http://localhost:3000/api/v1/users", {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({
                                username
                            })
                        })
                            .then(response => response.json())
                            .then(newUserObject => {
                                const renderUserComponent = new RenderUserComponent(newUserObject, this.form)
                                renderUserComponent.displayUserInfo(newUserObject.id)
                            })
                    })

                } /* end else statement */

            }) /* end .then response */

    } /* end checkExistence */

} /* end LoginComponent */





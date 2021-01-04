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
                    const renderUserComponent = new RenderUserComponent(userObjects, this.form)
                    const userId = renderUserComponent.findUserId()
                    renderUserComponent.displayUserInfo(userId)
                } else {
                    console.log("no")
                    const submitInput = document.getElementById("submit-button")
                    submitInput.remove()
                    const noSignupButton = document.createElement('button')
                    noSignupButton.textContent = "No"
                    noSignupButton.addEventListener('click', event => {
                        errorP.remove()
                        loginForm.append(submitInput)
                        loginForm.reset()
                    })

                    const errorP = document.createElement('p')
                    const signupButton = document.createElement('button')
                    signupButton.textContent = "Yes"

                    signupButton.addEventListener('click', signupButtonEvent => {
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

                    errorP.textContent = "Username does not exist - Would you like to signup with that username?" 
                    errorP.append(signupButton, noSignupButton)

                    main.prepend(errorP)
                }
            })
    }


}





class RenderUserComponent {
    constructor(objects, form) {
        this.userObjects = objects
        this.form = form
        this.username = this.form.username.value
    }

    findUserId() {
        const usernameArray = this.userObjects.map(userObject => userObject.username)
        const userIndex = (usernameArray.indexOf(this.username))
        const userId = this.userObjects[userIndex].id
        return userId
    }

    displayUserInfo(userId) {
        main.innerHTML = ""  
        headerH1.textContent = `Welcome Back, ${this.username.charAt(0).toUpperCase() + this.username.slice(1)}!`
        homeButton.dataset.id = userId
        let newUserId

        fetch(`http://localhost:3000/api/v1/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                // const instrumentUl = document.createElement('ul')
                // instrumentUl.id = "instrument-ul"
                newUserId = user.id
                user.instruments.forEach(inst => {
                    const instrumentShowComponent = new InstrumentShowComponent(inst)
                    instrumentShowComponent.createInstrumentLi()
                })
                const instrumentDiv = document.createElement('div')
                const instrumentDivTitle = document.createElement('h3')

                instrumentDiv.id = "instrument-div"
                instrumentDivTitle.textContent = "Currently Selling"

                instrumentDiv.append(instrumentDivTitle, instrumentUl)
                main.append(instrumentDiv)
                
                renderNewInstrumentForm(newUserId)
                
            }) /* end displayUserInfo .then response */
    
    } /* end displayUserInfo */

} /* end RenderUserComponent */
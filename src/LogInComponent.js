class LogInComponent{
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
           const userObjectsArray = userObjects.map(userObject => userObject.username)
            console.log(userObjectsArray)
        })
    }


}
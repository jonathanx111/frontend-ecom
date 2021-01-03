/* Dom Elements */
const loginForm = document.querySelector("#login-form")
const loginFormUsername = document.querySelector('#username')
const body = document.querySelector('body')

const logInComponent = new LogInComponent(loginForm)
logInComponent.submitFormEvent()
// const checkExistence = () => {
//      fetch("http://localhost:3000/api/v1/users")
//         .then(response => response.json())
//         .then(userObjects => {
//             userObjects.forEach(user => {
//                 if (user.username === loginForm.username.value) {
//                     body.innerHTML = ""
//                 } 
//             })
//         })
// }

// const handleFormEvent = event => {
//     event.preventDefault()
//     console.log("Inside Submit Form Event")

//     console.log(checkExistence())
    
// }

// // Event Listeners
// loginForm.addEventListener('submit', handleFormEvent)







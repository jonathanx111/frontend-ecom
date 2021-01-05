/* Dom Elements */
const loginForm = document.querySelector("#login-form")
const loginFormUsername = document.querySelector('#username')
const body = document.querySelector('body')
const headerH1 = document.querySelector('h1')
const main = document.querySelector('main')
const formLabel = document.querySelector('#form-label')

const logInComponent = new LogInComponent(loginForm)
logInComponent.submitFormEvent()





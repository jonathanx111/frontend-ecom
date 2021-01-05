class NewInstrumentFormComponent {
    constructor(formDiv) {
        this.formDiv = formDiv
        this.form = formDiv.querySelector("form")
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

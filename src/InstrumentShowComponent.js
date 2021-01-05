class InstrumentShowComponent {
    constructor(instrumentObj) {
        this.instrumentObj = instrumentObj
    }

    createLi(instrumentUl) {
        const li = document.createElement('li')
        li.textContent = `${this.instrumentObj.year} ${this.instrumentObj.brand} ${this.instrumentObj.model} ${this.instrumentObj.type_of}`
        this.addLiClickEvent(li)
        instrumentUl.append(li)
    }

    addLiClickEvent(li) {
        li.addEventListener('click', evt => {
            main.innerHTML = ""
            headerH1.textContent = `${this.instrumentObj.year} ${this.instrumentObj.brand} ${this.instrumentObj.model}`

            const instrumentShowPageDiv = document.createElement("div")
            instrumentShowPageDiv.id = "instrument-show-page-div"

            const instImg = document.createElement("img")
            instImg.src = this.instrumentObj.picture_url 
            instImg.id = "instrument-img"
            
            const instYearP = document.createElement("p")
            instYearP.textContent = "Year: " + this.instrumentObj.year

            const instBrandP = document.createElement("p")
            instBrandP.textContent = "Brand: " + this.instrumentObj.brand
            
            const instModelP = document.createElement("p")
            instModelP.textContent ="Model: " + this.instrumentObj.model
            
            const instConditionP = document.createElement("p")
            instConditionP.textContent = "Condition: " + this.instrumentObj.condition
            
            const instPriceP = document.createElement("p")
            instPriceP.textContent = "Price: " + this.instrumentObj.price

            // const deleteButton = document.createElement('button')

            instrumentShowPageDiv.append(instImg, instYearP, instBrandP, instModelP, instConditionP, instPriceP)

            main.append(instrumentShowPageDiv)
        })
        
    }

}
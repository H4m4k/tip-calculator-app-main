const bill = document.querySelector('#amount')
const people = document.querySelector('#people')
const buttons = document.querySelectorAll('.tip button')
const zero = document.querySelector('#zero')

let person_Tip = document.querySelector('#tip_Value')
let person_Bill = document.querySelector('#total_Value')

let selected_Tip = '0'
let per


people.addEventListener('input', validate)

buttons.forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    selected_Tip = event.target.textContent.replace('%','')
}))


// ORDER OF CALCULATION 
/*
1. user enters bill amount
2. user selects, a tip
3. user enters number of people 
4. display outcome

ad.2 - calculate the total amount of tip from the bill
ad.3 - divide the bill by number of people, divide the tip, by the number of people
ad.4a - display tip amount per person in Tip Amount
ad.4b - display total amount per person after summing the bill per person and tip per person
*/




function personal_Tip(percent) {
    if (people.value === '0' || selected_Tip === '0' ) {
        return person_Tip.textContent = '0.00'
    } else {
        person_Tip =  ( ( (percent/100)*bill.value )/people.value  ).toFixed(2)
        return person_Tip
    }

}

function personal_Bill() {
    if (people.value === '0') {
        zero.classList.remove('off')
        people.classList.add('red_Outline')
        return person_Bill.textContent = '0.00'
    } else {
         zero.classList.add('off')
         people.classList.remove('red_Outline')
         return ((bill.value/people.value)).toFixed(2)
    }
}

function sum() {
        return Number.parseFloat(personal_Bill()) + Number.parseFloat(personal_Tip(selected_Tip))
}

function validate() {
    console.log(selected_Tip)
    person_Tip.textContent = `$${personal_Tip(selected_Tip)}`
    person_Bill.textContent = `$${sum().toFixed(2)}`
    return console.log(people.value)
}



const bill = document.querySelector('#amount')
const people = document.querySelector('#people')
let person_Tip = document.querySelector('#tip_Value')
let total_Tip = document.querySelector('#total_Value')

people.addEventListener('input', validate)


function personal_Tip() {
    return temp = (bill.value/people.value).toFixed(2)
}

function sum_Tip() {
    return temp = (people.value*personal_Tip()).toFixed(2)
}

function validate() {
    person_Tip.textContent = `$${personal_Tip()}`
    total_Tip.textContent = `$${sum_Tip()}`
    return people.value === 0 ? console.log('zero ludzi') : console.log('ok')
}

personal_Tip()
sum_Tip()
console.log(bill.value + '  ' + people.value)
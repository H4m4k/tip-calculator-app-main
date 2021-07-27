const bill = document.querySelector('#amount')
const people = document.querySelector('#people')
const buttons = document.querySelectorAll('.tip button')
const cant_Zero = document.querySelector('#warning')
const reset_Btn = document.querySelector('#reset')

let person_Tip = document.querySelector('#tip_Value')
let person_Bill = document.querySelector('#total_Value')

let selected_Tip = 0;
let last_Target = '';

people.addEventListener('input', validate)






//-----------------// AD. 2 //-----------------//
buttons.forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    selected_Tip = Number.parseInt(event.target.textContent);
    personal_Tip();
}))

buttons.forEach(button => {button.addEventListener('focus', event => {
    event.target.style.backgroundColor = '#26c2ad'
    event.target.style.color = '#00494d'    
})
})



//-----------------// AD. 5 //-----------------//
reset_Btn.addEventListener('click', reset)

// ORDER OF CALCULATION 
/*
1. user enters bill amount
2. user selects, a tip
3. user enters number of people 
4. display outcome
5. reset

ad.2 - calculate the bill per person, divide bill by people number
ad.3 - calculate the tip from bill, user selects TIP percentage
ad.4a - display tip amount per person in Tip Amount
ad.4b - display total amount per person after summing the bill per person and tip per person
*/




function personal_Tip(percent = '0') {
    if (personal_Bill.textContent === '0.00') {
        return person_Tip.textContent = '0.00'
    } else {
        return  ( ( (percent/100)*bill.value )/people.value  ).toFixed(2)
    }

}

function personal_Bill() {
    if (people.value === '0') {
        cant_Zero.classList.remove('off')
        people.classList.add('red_Outline')
        return person_Bill.textContent = '0.00'
    } else {
         cant_Zero.classList.add('off')
         people.classList.remove('red_Outline')
         return (bill.value/people.value).toFixed(2)
    }
}

function sum() {
        return Number.parseFloat(personal_Bill()) + Number.parseFloat(personal_Tip(selected_Tip))
}

function validate() {
    if(people.value === '0') {

    } else {
        person_Tip.textContent = `$${personal_Tip(selected_Tip)}`
        person_Bill.textContent = `$${sum().toFixed(2)}`
        return console.log(people.value)
    }
}

function reset() {
    bill.value = 0;
    people.value = 0;
    selected_Tip = 0;
    person_Tip.textContent =`$${'0.00'}`;
    person_Bill.textContent = `$${'0.00'}`;
    return 0;
}

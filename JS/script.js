const calculator = document.querySelector("article");
const bill = document.querySelector("#amount");
const people = document.querySelector("#people");

const buttons = document.querySelectorAll(".tip button");
const custom = document.querySelector("#custom");
const cant_Zero = document.querySelector("#warning");
const reset_Btn = document.querySelector("#reset");

const integer = /\d{1,}/;
const zeroes = /0{2,}/;
const dot = /\./;
let interval;
let person_Tip = document.querySelector("#tip_Value");
let person_Bill = document.querySelector("#total_Value");

let selected_Tip = 0;

bill.addEventListener("input", validate_Bill);
people.addEventListener("input", validate_People);
custom.addEventListener("input", validate_Custom);
calculator.addEventListener("change", runManager);

reset();

//-----------------// Manager //-----------------//
// checks for ready to calculate state if all keys values are true
const manager = {
  bill: false,
  tip: false,
  people: false,
};

//-----------------// AD. 2 //-----------------//
buttons.forEach((button) =>
  button.addEventListener("click", (event) => {
    event.preventDefault();
    selected_Tip = Number.parseInt(event.target.dataset.tip);
    console.log(event.target.dataset.tip + " event target");
    console.log(selected_Tip + " selected TIP");
    personal_Tip(selected_Tip);
    manager.tip = true;
  })
);

//-----------------// AD. 5 //-----------------//
reset_Btn.addEventListener("click", reset);

// ORDER OF CALCULATION
/*
1. user enters bill amount
 a. calculate the bill per person
2. user selects, a tip
 a. calculate the tip from the bill
3. user enters number of people 
4. display outcome
5. reset

 - calculate the bill per person, divide bill by people number
 - calculate the tip from bill, user selects TIP percentage
 - display tip amount per person in Tip Amount
 - display total amount per person after summing the bill per person and tip per person
*/

function personal_Tip(tip) {
  return (((tip / 100) * bill.value) / people.value).toFixed(2);
}

function total_Amount() {
  let check = (bill.value / people.value).toFixed(2);
  return (
    Number.parseFloat(check) + Number.parseFloat(personal_Tip(selected_Tip))
  );
}

function test() {
  console.log("manager działa");
  let check = Object.values(manager).every((item) => item === true);
  if (check) {
    person_Tip.textContent = `$${personal_Tip(selected_Tip)}`;
    person_Bill.textContent = `$${total_Amount().toFixed(2)}`;
  }
}

function validate_Bill() {
  if (!integer.test(bill.value) && bill.value !== "0") {
    console.log("wpisałeś litery kasztanie");
    bill.value = "";
  } else if (zeroes.test(bill.value)) {
    bill.value = "";
  } else {
    manager.bill = true;
  }
}

function validate_People() {
  if (!integer.test(people.value) && people.value !== "0") {
    console.log("wpisałeś litery kasztanie");
    people.value = "";
  } else if (people.value === "0") {
    zeroWarning();
  } else if (dot.test(people.value)) {
    reset();
  } else if (zeroes.test(people.value)) {
    people.value = "";
  } else {
    removeWarning();
    manageReset("on");
    manager.people = true;
  }
}

function validate_Custom() {
  if (!integer.test(custom.value)) {
    custom.value = "";
  } else {
    selected_Tip = custom.value;
    manager.tip = true;
  }
}

function reset() {
  bill.value = "";
  people.value = "";
  selected_Tip = "0";
  person_Tip.textContent = `$${"0.00"}`;
  person_Bill.textContent = `$${"0.00"}`;
  custom.value = "" + "%";
  manageReset("off");
  return 0;
}

function runManager() {
  if (person_Bill.textContent !== "$0.00") {
    console.log("wyłączam interwał");
    return clearInterval(interval);
  }
  interval = setInterval(test, 500);
  return console.log(interval + " interwał");
}

function zeroWarning() {
  warning.classList.remove("off");
  people.classList.add("red_Outline");
}

function removeWarning() {
  warning.classList.add("off");
  people.classList.remove("red_Outline");
}

function manageReset(state) {
  if (state === "on") {
    return reset_Btn.classList.add("btn_Active");
  } else if (state === "off") {
    return reset_Btn.classList.remove("btn_Active");
  }
}

/*  FEEDBACK 
The JS for 'Tip Amount' and 'Total Amount' shouldn't calculate when the output will be NaN or Infinity.

The selected tip amount button should stay the lighter green to indicate the current selection.

When a custom tip is entered, the button should change color just like the other tip buttons. When going back to a fixed tip amount, the number should reset and go back to custom automatically.

Custom tip text is not centered.

The reset button is the wrong color.

VV  - The input field text should change color when a number is entered, and the 0 placeholder text shouldn't remain.
  /SOLUTION/ - added the placeholder pseudoelement with color styling 

VV  - The number of people doesn't give an error when a fractional number is put in.
  /SOLUTION/ - used REGEX to reset every time a dot is entered
*/

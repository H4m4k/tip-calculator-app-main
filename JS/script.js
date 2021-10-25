const calculator = document.querySelector("article");
const bill = document.querySelector("#amount");
const people = document.querySelector("#people");

const buttons = document.querySelectorAll(".tip button");
const custom = document.querySelector("#custom");
const cant_Zero = document.querySelector("#warning");
const reset_Btn = document.querySelector("#reset");

const regex = /\d{1,}/;
const zeroes = /0{2,}/;
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
  if (!regex.test(bill.value) && bill.value !== "0") {
    console.log("wpisałeś litery kasztanie");
    bill.value = "0";
  } else if (zeroes.test(bill.value)) {
    bill.value = "0";
  } else {
    manager.bill = true;
  }
}

function validate_People() {
  if (!regex.test(people.value) && people.value !== "0") {
    console.log("wpisałeś litery kasztanie");
    people.value = "0";
  } else if (people.value === "0") {
    zeroWarning();
  } else if (zeroes.test(people.value)) {
    people.value = "0";
  } else {
    removeWarning();
    manageReset("on");
    manager.people = true;
  }
}

function validate_Custom() {
  if (!regex.test(custom.value)) {
    custom.value = "";
  } else {
    selected_Tip = custom.value;
    manager.tip = true;
  }
}

function reset() {
  bill.value = "0";
  people.value = "0";
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

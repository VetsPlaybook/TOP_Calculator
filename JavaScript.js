const calculate = document.querySelector('.calculation');
const answer = document.querySelector('.answer');
const buttons = document.querySelectorAll('button');
//In a calculator, we want to evaluate a string
equation = '';
evaluation = '';
decimalClicked = false;
addOperator = false;

//Allows keyboard typing
function keyboardSupport(e){
	const btns = document.querySelector(`button[data-key="${e.keyCode}"]`);
	if (btns.textContent.match(/([0-9])/)){
	equation += btns.textContent;
	calculate.innerText = equation;
	addOperator = false;
	}

	//Clear the calculation
	if (btns.textContent == 'Clear'){clearCalculation();}

	//Backspace
	if (btns.textContent == 'Back'){backSpace();}

	//Decimal
	if (decimalClicked == false && btns.textContent == '.'){addDecimal();} 

	//Adding operators
	if (addOperator == false && btns.textContent.match(/([\+\-\/\*])/)){
		equation += btns.textContent;
		calculate.innerText = equation;
		addOperator = true;
		decimalClicked = false;
	}

	//Evaluate the calculation
	if (btns.textContent == '='){evaluate();}
}

//Allows mouse clicking
buttons.forEach((button) =>{
	button.addEventListener('click',(e) =>{
			//Limits what the user can input
			if (e.target.textContent.match(/([0-9])/)){
			equation += e.target.textContent;
			calculate.innerText = equation;
			addOperator = false;
			}

			//Clear the calculation
			if (e.target.textContent == 'Clear'){clearCalculation();}

			//Backspace
			if (e.target.textContent == 'Back'){backSpace();}

			//Decimal
			if (decimalClicked == false && e.target.textContent == '.'){addDecimal();}

			//Adding operators
			if (addOperator == false && e.target.textContent.match(/([\+\-\/\*])/)){
			equation += e.target.textContent;
			calculate.innerText = equation;
			addOperator = true;
			decimalClicked = false;
			}

			//Evaluate the calculation
			if (e.target.textContent == '='){evaluate();}
	})
})

//Clear the calculation
function clearCalculation() {
  equation = '';
  calculate.innerText = '';
  evaluation = '';
  answer.innerText = '';
};

//Delete one space
function backSpace() {
  equation = equation.slice(0, equation.length - 1);
  calculate.textContent = equation;
}

//Decimal rule
function addDecimal(){
	equation += '.';
	calculate.innerText = equation;
	decimalClicked = true;
} 

//Evaluate the string
function evaluate() {
	partialAnswer =  new Function('return ' + equation)();
  	//Round to two decimal points
  	answer.innerText  = Math.round((partialAnswer + 0.00001) * 100) / 100;
}

window.addEventListener('keydown', keyboardSupport);

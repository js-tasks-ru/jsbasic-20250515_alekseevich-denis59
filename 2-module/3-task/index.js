function getNumberFromUser(numberOfValue) {
    let num;
    do {
        num = prompt(`Введите ${numberOfValue} (только положительные числа):`, 0);
        num = Number(num);
    } while ( isNaN(num) || num === ''|| num < 0);
    return num;
}

let calculator = {
	read() {
		this.value1 = getNumberFromUser(1);
		this.value2 = getNumberFromUser(2);
	},
    sum(){
    return this.value1 + this.value2;
    },
    mul() {
        return this.value1 * this.value2;
    },
}

calculator.read()
// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально

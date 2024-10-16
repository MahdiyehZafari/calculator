const inputField = document.querySelector('.input input');
const buttons = document.querySelectorAll('.buttons button');
const operatorButtons = document.querySelectorAll('.operator');

// متغیرها برای نگهداری مقادیر
let currentInput = '';
let firstOperand = null;
let operator = '';

// تابع برای به‌روزرسانی ورودی
function updateInput(value) {
    currentInput += value;
    inputField.value = currentInput;
}

// تابع برای محاسبه نتیجه
function calculate() {
    if (firstOperand === null || operator === '') return;

    let result;
    const secondOperand = parseFloat(currentInput);
    // بررسی تقسیم بر صفر
    if (operator === '/' && secondOperand === 0) {
        inputField.value = 'خطا: تقسیم بر صفر';
        resetCalculator();
        return;
    }
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    // به‌روزرسانی ورودی با نتیجه
    inputField.value = result.toLocaleString();
    currentInput = '';
    operator = '';
    firstOperand = result.toLocaleString(); // برای ادامه محاسبات
}

// تابع برای تنظیم عملگر
function setOperator(op) {
    if (currentInput === '') return; // جلوگیری از تنظیم عملگر بدون عدد
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else {
        calculate(); // محاسبه اگر قبلاً عملگر وجود دارد
    }
    operator = op;
    currentInput = ''; // پاک کردن ورودی فعلی
}

// افزودن رویداد به دکمه‌ها
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if ('0123456789.'.includes(value)) {
            updateInput(value);
        } else if (value === '=') {
            calculate();
        } else {
            setOperator(value);
        }
    });
});

// افزودن رویداد به دکمه پاک کردن
document.getElementById('clear').addEventListener('click', () => {
    currentInput = '';
    firstOperand = null;
    operator = '';
    inputField.value = '0'; // بازنشانی ورودی
});
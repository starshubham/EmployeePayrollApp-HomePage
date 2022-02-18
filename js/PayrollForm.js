/* UC2:- Ability to set Event Listeners when Document is loaded so as to.
         - Set Event Listener on Salary Range to display appropriate value.
         - Validation of Name and Date
*/
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary—output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

});


/* UC3:- Ability to create Employee Payroll Object On Save. 
         - Validation of Name and Date and if failed then set the UI accordingly. 
*/
const save = () => {
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    }
    catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }

    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+" " + getInputValueById('#month')+ " " +
                getInputValueById('#year');
    employeePayrollData.startDate = new Date(Date.parse(date));
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
}

/*
1: querySelector is the newer feature.
2: The querySelector method can be used when selecting by element name, nesting, or class name.
3: querySelector lets you find elements with rules that can't be expressed with getElementById
*/
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

/*
1: getElementById is better supported than querySelector in older versions of the browsers.
2: The thing with getElementById is that it only allows to select an element by its id.
*/
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

/* UC4:- Ability to save the Employee Payroll Object to Local Storage.
    - Understand the difference between Local Storage, Session Storage and older feature of storing in cookies. 
*/
 function createAndUpdateStorage(employeePayrollData) 
 {
     let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

     if (employeePayrollList != undefined) 
     {
         employeePayrollList.push(employeePayrollData);
     }
     else 
     {
         employeePayrollList = [employeePayrollData];
     }
     alert(employeePayrollList.toString());
     localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
 }

/* UC5:- Ability to reset the form on clicking reset  */
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2022');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => { item.checked = false; });
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
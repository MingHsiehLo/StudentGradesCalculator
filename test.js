let empty, numEstudiantes, error, errorName, errorDate, errorTest;
let testCounter;
let today = new Date();

function wrong(array) {
    array.style.borderColor = "rgb(255, 14, 14)";
    array.style.backgroundColor = "rgb(255, 244, 244)";
    array.style.borderStyle = "solid";
}

function correct(array) {
    array.style.borderColor = "initial";
    array.style.backgroundColor = "white";
    array.style.borderStyle = "inset";
}

function checkStudents() {
    let parent = document.getElementById("parentError");
    parent.innerHTML = "";
    let firstT = document.getElementById("tablaGenerado");
    firstT.innerHTML = "";
    let secondT = document.getElementById("tablaResultados");
    secondT.innerHTML = "";
    let thirdT = document.getElementById("tablaRes");
    thirdT.innerHTML = "";
    error = false;
    numEstudiantes = parseInt(document.getElementById("numIngresado").value);
    if (numEstudiantes <= 0 || document.getElementById("numIngresado").value == "") {
        wrong(numIngresado);
        error = true;
        child = document.createElement("p");
        child.innerHTML = "*Please provide a number greater or equal to 1";
        parent.appendChild(child); 
    }
    else {
        correct(numIngresado);
    }
    if (error == false) {
        generarTabla();
    }
}

function generarTabla() {

    let inputTable = "<table>";
    inputTable += "<tr><td>Student's Number</td>";
    inputTable += "<td>Student's Name</td>"
    inputTable += "<td>Date of Birth</td>";
    inputTable += "<td>Test #1</td>";
    inputTable += "<td>Test #2</td>";
    inputTable += "<td>Test #3</td>";
    inputTable += "</tr>";

    for (let i = 0; i < numEstudiantes; i++) {
        inputTable += "<tr><td>"+ (i+1) +"</td>";
        inputTable += "<td><input name='studentName' type='text'></td>";
        inputTable += "<td><input name='studentDOB' type='date'></td>";
        inputTable += "<td><input name='studentTest1' type='number' min='0' max='100'></td>";
        inputTable += "<td><input name='studentTest2' type='number' min='0' max='100'></td>";
        inputTable += "<td><input name='studentTest3' type='number' min='0' max='100'></td>";
        inputTable += "</tr>";
    }
    inputTable += "<tr><td colspan='6' text-align='center'><button onclick='validarTabla()'>Submit</button></td></tr>";
    inputTable += "</table>";
    document.getElementById("tablaGenerado").innerHTML = inputTable;
    document.getElementById("tablaRes").innerHTML = "";
}

function isString(myString) {
    return /[^A-Za-záéíóú ]/.test(myString);
}

function emptyInput(value) {
    if (value == "") {
        empty = true; 
    }
}

function testChecker (test) {
    errorTest = false;
    for (let i = 0; i < test.length; i++) {
        var nota = test[i].value;
        if (nota > 100 || nota < 0 || nota == "") {
            wrong(test[i]);
            error = true;
            errorTest = true;
        }
        else {
            correct(test[i]);
        }
        emptyInput(nota);
    }
    if(errorTest == true) {
        testCounter = testCounter+1;
    }
}

let nombreArray = document.getElementsByName("studentName");
let fechaArray = document.getElementsByName("studentDOB");
let nota1Array = document.getElementsByName("studentTest1");
let nota2Array = document.getElementsByName("studentTest2");
let nota3Array = document.getElementsByName("studentTest3");

function validarTabla() {
    let secondT = document.getElementById("tablaResultados");
    secondT.innerHTML = "";
    let thirdT = document.getElementById("tablaRes");
    thirdT.innerHTML = "";
    testCounter = 0;
    let parent = document.getElementById("parentError");
    parent.innerHTML = "";
    let child; 
    errorName = false;
    errorDate = false;
    error = false;
    empty = false;
    for (let i = 0; i < nombreArray.length; i++) {
        let nombre = nombreArray[i].value;

        if (isString(nombre) === true || nombre === "") {
            wrong(nombreArray[i]);
            error = true;
            errorName = true;
        }
        else {
            correct(nombreArray[i]);
        }
        emptyInput(nombre);
    }
    if(errorName == true) {
        child = document.createElement("p");
        child.innerHTML = "*Name must be without numbers or special characters";
        parent.appendChild(child); 
    }
    for (let i = 0; i < fechaArray.length; i++) {
        let fecha = new Date(fechaArray[i].value);
        let fechay = fechaArray[i].value;
        if (fecha > today === true || fechay === "") {
            wrong(fechaArray[i]);
            error = true;
            errorDate = true;
        }
        else {
            correct(fechaArray[i]);
        }
        emptyInput(fechay);
    }
    if(errorDate == true) {
        child = document.createElement("p");
        child.innerHTML = "*Please provide a valid date of birth";
        parent.appendChild(child); 
    }

    testChecker(nota1Array);
    testChecker(nota2Array);
    testChecker(nota3Array);
    
    if (testCounter >= 1) {
        child = document.createElement("p");
        child.innerHTML = "*Test score must be greater or equal to zero OR less than hundred";
        parent.appendChild(child);
    }
    if (empty == true) {
        alert("Be careful! There are empty spaces");
    }
    if (empty == false && error == false) {
        procesarTabla();
    }
}

function categoryCheck (cal) {
    if (cal >= 96) {
        return "Excellent";
    }
    else if (cal >= 91 && cal < 96) {
        return "Very Good";
    }
    else if (cal >= 76 && cal < 91) {
        return "Good";
    }
    else if (cal >= 51 && cal < 76) {
        return "Mediocre";
    }
    else {
        return "Terrible";   
    }
}

function procesarTabla() {
    let acum = 0;
    let parent = document.getElementById("parentError");
    parent.innerHTML = "";
    let tablaResultados = "<table>";
    tablaResultados += "<tr><td class='special'>Student's Number: </td>";
    tablaResultados += "<td class='special'>Student's Name: </td>"
    tablaResultados += "<td class='specialTable'>Age: </td>";
    tablaResultados += "<td class='specialTable'>Score: </td>";
    tablaResultados += "<td class='specialTable'>Category: </td>";
    tablaResultados += "</tr>";

    for (let i = 0; i < numEstudiantes; i++) {
        tablaResultados += "<tr>"; 
        tablaResultados += "<td>" + (i+1) +"</td>";
        tablaResultados += "<td>" + nombreArray[i].value +"</td>";
        let edadAlumno = today.getDate() + ((today.getMonth()+1)*30) + ((today.getFullYear())*365);
        edadAlumno -= parseInt(fechaArray[i].value.substr(8,2)) + ((parseInt(fechaArray[i].value.substr(5,2)))*30) + ((parseInt(fechaArray[i].value.substr(0,4)))*365);
        edadAlumno /= 365;
        tablaResultados += "<td>" + parseInt(edadAlumno) +"</td>";
        let score = ((nota1Array[i].value*0.3) + (nota2Array[i].value*0.3) + (nota3Array[i].value*0.4));
        acum = acum + score;
        tablaResultados += "<td>" + parseFloat(score.toFixed(2)) +"</td>";
        tablaResultados += "<td>" + categoryCheck(score) +"</td>";
        tablaResultados += "</tr>";
    }
    tablaResultados += "</tabla>";
    document.getElementById("tablaResultados").innerHTML = tablaResultados;

    let tablaGrupo = "<table>";
    tablaGrupo += "<tr>"; 
    tablaGrupo += "<td class='specialTable'>Group's average: </td>";
    tablaGrupo += "<td class='specialTable'>Category: </td>";
    tablaResultados += "</tr>";
    let promGrupo = acum/numEstudiantes;
    tablaGrupo += "<tr>"; 
    tablaGrupo += "<td>" + promGrupo.toFixed(2) +"</td>";
    tablaGrupo += "<td>" + categoryCheck(promGrupo) +"</td>";
    tablaGrupo += "</tr>";
    tablaGrupo += "</tabla>";
    document.getElementById("tablaRes").innerHTML = tablaGrupo;
}
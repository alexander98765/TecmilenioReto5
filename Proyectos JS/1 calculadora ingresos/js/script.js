/**
 * @fileOverview File to handle income calculator
 * @author Perez, Alejandro
 * @version 1.0.0
 */

/**
 * Function to listen for click event on button txtCalcularSueldo
 * Calculates total incomes
 */
$("#txtCalcularSueldo").click(function(){
    var sueldoBruto = $("#txtSueldoBruto").val();
    if(isEmpty(sueldoBruto)){
        alert("Por favor, ingresa tu sueldo mensual")
        return false;        
    }else if(isNaN(sueldoBruto) || sueldoBruto <= 0){
        alert("Por favor, ingresa un sueldo mensual valido")
        return false;
    }
    var datosISR = calcularRetencionISR(sueldoBruto);
    console.log(datosISR)
    calcularTotales(datosISR)
});

/**
 * Function that computes ISR retention. Uses 2024 retention percentages
 * 
 * @param {long} sueldoBruto Total incomes per month
 * @returns {Object} datos Array with ISR information
 */
function calcularRetencionISR(sueldoBruto){
    try{
        sueldoBruto = parseFloat(sueldoBruto)
        var limiteInferior = "";
        var limiteSuperior = "";
        var cuotaFija = "";
        var porcentajeExcedente = "";
        var sueldoTmp, porcIsrTmp, isr, execenteLimiteInf;
        var imms = 0;
        var subsidio = 0;
        var datos = [];
        if (between(sueldoBruto, 0.01, 8952.49)) {        
            limiteInferior = 0.01;
            limiteSuperior = 8952.49;
            cuotaFija = 0.00;
            porcentajeExcedente = 1.92;
        }else if(between(sueldoBruto, 8952.50, 75984.55)){
            limiteInferior = 8952.50;
            limiteSuperior = 75984.55;
            cuotaFija = 171.88;
            porcentajeExcedente = 6.40;
        }else if(between(sueldoBruto, 75984.56, 133536.07)){
            limiteInferior = 75984.56;
            limiteSuperior = 133536.07;
            cuotaFija = 4461.94;
            porcentajeExcedente = 10.88;
        }else if(between(sueldoBruto, 133536.08, 155229.80)){
            limiteInferior = 133536.08;
            limiteSuperior = 155229.80;
            cuotaFija = 10723.55;
            porcentajeExcedente = 16.00;
        }else if(between(sueldoBruto, 155229.81, 185852.57)){
            limiteInferior = 155229.81;
            limiteSuperior = 185852.57;
            cuotaFija = 14194.54;
            porcentajeExcedente = 17.92;
        }else if(between(sueldoBruto, 185852.58, 374837.88)){
            limiteInferior = 185852.58;
            limiteSuperior = 374837.88;
            cuotaFija = 19682.13;
            porcentajeExcedente = 21.36;
        }else if(between(sueldoBruto, 374837.89, 590795.99)){
            limiteInferior = 374837.89;
            limiteSuperior = 590795.99;
            cuotaFija = 60049.40;
            porcentajeExcedente = 23.52;
        }else if(between(sueldoBruto, 590796.00, 1127926.84	)){
            limiteInferior = 590796.00;
            limiteSuperior = 1127926.84;
            cuotaFija = 110842.74;
            porcentajeExcedente = 30.00;
        }else if(between(sueldoBruto, 1127926.85, 1503902.46)){
            limiteInferior = 1127926.85;
            limiteSuperior = 1503902.46;
            cuotaFija = 271981.99;
            porcentajeExcedente = 32.00;
        }else if(between(sueldoBruto, 1503902.47, 4511707.37)){
            limiteInferior = 1503902.47;
            limiteSuperior = 4511707.37;
            cuotaFija = 392294.17;
            porcentajeExcedente = 34.00;
        }else if(sueldoBruto > 4511707.38){
            limiteInferior = 4511707.38;
            limiteSuperior = 4511707.38;
            cuotaFija = 1414947.85;
            porcentajeExcedente = 35.00;
        }
        execenteLimiteInf = sueldoBruto - limiteInferior;
        console.log("resta " + execenteLimiteInf)
        porcIsrTmp = calcularProcentaje(execenteLimiteInf, porcentajeExcedente);
        console.log("porcentaje " + porcIsrTmp)
        porcIsrTmp = porcIsrTmp + cuotaFija;
        isr = porcIsrTmp;
        console.log("isr " + isr)
        datos.push(limiteInferior, execenteLimiteInf, porcentajeExcedente, porcIsrTmp, cuotaFija, isr, imms, subsidio, sueldoBruto)
        return datos;
    }catch(ex){
        alert("Error calculo ISR " + ex);
    }
}

/**
 * Function to calculate a percentage
 * 
 * @param {long} sueldoTmp Amount to make the compute
 * @param {long} porcentajeExcedente percetage to be computed 
 * @returns {long} total Percentage
 */
function calcularProcentaje(sueldoTmp, porcentajeExcedente){
    var total;
    total = porcentajeExcedente * sueldoTmp;
    total = total / 100;
    return total;
}

/**
 * Function that validates if a given value is empty
 * 
 * @param {string} val Parameter to be validated
 * @returns {boolean} flag Indicates if value is empty or not
 */
function isEmpty(val){
    var flag = false;
    if(val == "" || val == " " || val == null || val == undefined){
        flag = true;
    }
    console.log(flag)
    return flag;
}

/**
 * 
 * @param {long} x Value to be compared
 * @param {long} min Min value in range
 * @param {long} max Max value in range
 * @returns {boolean} Flag to indicate if given value is inside range
 */
function between(x, min, max){
    return x >= min && x <= max;
}

/**
 * 
 * @param {Object} datos Array with general information about retentions 
 */
function calcularTotales(datos){
    var isr = datos[3] + datos[4];
    isr = isr.toFixed(2)
    total = datos[8] - isr; 
    $("#limiteInf").text(datos[0].toFixed(2));
    $("#exedenteLimiteInf").text(datos[1].toFixed(2));
    $("#porceExcedenteLimiteInf").text(datos[2].toFixed(2));
    $("#impuestoMarginal").text(datos[3].toFixed(2));
    $("#cuotaFija").text(datos[4].toFixed(2));
    $("#isr").text(isr);
    $("#imms").text(datos[6].toFixed(2));
    $("#subsidio").text(datos[7].toFixed(2));
    $("#total").text(total);
}
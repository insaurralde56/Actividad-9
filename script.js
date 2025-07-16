// Variables principales
let fechaActual = new Date();
let mesActual = fechaActual.getMonth();
let añoActual = fechaActual.getFullYear();

// Lista de feriados (formato: "YYYY-MM-DD")
const feriados = [
    "2025-06-16", 
    "2025-06-20", 
    "2025-07-09",
    "2025-05-01",
    "2025-05-25",
    "2025-07-09",
    "2025-08-17",
    "2025-10-12"
];

// Nombres de los meses
const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Función para verificar si es año bisiesto
function esBisiesto(año) {
    return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
}

// Función para obtener días en un mes
function diasEnMes(mes, año) {
    return new Date(año, mes + 1, 0).getDate();
}

// Función para obtener el primer día de la semana del mes
function primerDiaSemana(mes, año) {
    const primerDia = new Date(año, mes, 1).getDay();
    return primerDia === 0 ? 6 : primerDia - 1; // Ajustar para que Lunes sea 0
}

// Función para generar el calendario
function generarCalendario() {
    const diasContainer = document.getElementById('calendar-days');
    const mesElement = document.getElementById('month');
    const añoElement = document.getElementById('year');
    const infoElement = document.getElementById('month-info');

    // Limpiar días anteriores
    diasContainer.innerHTML = '';

    // Actualizar mes y año
    mesElement.textContent = nombresMeses[mesActual];
    añoElement.textContent = añoActual;

    // Información del mes
    const totalDias = diasEnMes(mesActual, añoActual);
    const esBisiestoTexto = esBisiesto(añoActual) ? "Sí" : "No";
    infoElement.textContent = `Días del mes: ${totalDias} | Año bisiesto: ${esBisiestoTexto}`;

    // Obtener primer día y total de días
    const primerDia = primerDiaSemana(mesActual, añoActual);
    
    // Agregar días vacíos al inicio
    for (let i = 0; i < primerDia; i++) {
        const diaVacio = document.createElement('div');
        diaVacio.classList.add('calendar__item', 'empty-day');
        diasContainer.appendChild(diaVacio);
    }

    // Agregar días del mes
    for (let dia = 1; dia <= totalDias; dia++) {
        const diaElement = document.createElement('div');
        diaElement.classList.add('calendar__item');
        diaElement.textContent = dia;
        diaElement.setAttribute('data-day', dia);
        
        // Formato de fecha para comparaciones
        const fechaFormateada = `${añoActual}-${String(mesActual + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        diaElement.setAttribute('data-date', fechaFormateada);

        // Verificar si es día actual
        const hoy = new Date();
        if (dia === hoy.getDate() && mesActual === hoy.getMonth() && añoActual === hoy.getFullYear()) {
            diaElement.classList.add('calendar__day--today');
        }

        // Verificar si es feriado
        if (feriados.includes(fechaFormateada)) {
            diaElement.classList.add('calendar__day--holiday');
        }

        // Verificar si es fin de semana
        const diaSemana = new Date(añoActual, mesActual, dia).getDay();
        if (diaSemana === 0 || diaSemana === 6) {
            diaElement.classList.add('calendar__day--weekend');
        }

        diasContainer.appendChild(diaElement);
    }
}

// Event listeners para navegación
document.getElementById('prev-month').addEventListener('click', () => {
    mesActual--;
    if (mesActual < 0) {
        mesActual = 11;
        añoActual--;
    }
    generarCalendario();
});

document.getElementById('next-month').addEventListener('click', () => {
    mesActual++;
    if (mesActual > 11) {
        mesActual = 0;
        añoActual++;
    }
    generarCalendario();
});

// Inicializar calendario
generarCalendario();
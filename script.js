let tareas = [];
let contadorId = 0;


let inputTarea = document.getElementById('ponerTarea');
let selectCat = document.getElementById('seleccionarCategoria');
let inputOtra = document.getElementById('inputOtra');
let otraWrap = document.getElementById('otraCosa');
let errorMensaje = document.getElementById('error');
let listaTareas = document.getElementById('listaDeTareas');
let listaVacia = document.getElementById('listaVacia');
let spanTotal = document.getElementById('total');
let spanCompletadas = document.getElementById('completadas');
let btnAgregar = document.getElementById('agregarTarea');


selectCat.addEventListener('change', function () {
    console.log('La categoría seleccionada:', selectCat.value);
    if (selectCat.value === 'otra') {
        otraWrap.style.display = 'block';
        inputOtra.focus();
    } else {
        otraWrap.style.display = 'none';
        inputOtra.value = '';
    }
});


function agregarTarea() {
    const texto = inputTarea.value.trim();
    let categoria = selectCat.value;
    if (categoria === 'otra') {
        categoria = inputOtra.value.trim();
    }
    if (texto === '') {
        errorMensaje.textContent = 'Escribe una tarea para poder agregarla a la lista';
        inputTarea.focus();
        console.log('Error: tarea vacía');
        return;
    }
    if (categoria === '') {
        errorMensaje.textContent = 'Selecciona una categoría para tu tarea';
        console.log('Error: categoría vacía');
        return;
    }
    errorMensaje.textContent = '';
    const nuevaTarea = {
        id: contadorId++,
        texto: texto,
        categoria: categoria,
        hecha: false,
        urgente: false
    };
    tareas.push(nuevaTarea);
    console.log('La tarea agregada fue:', nuevaTarea);
    inputTarea.value = '';
    selectCat.value = '';
    inputOtra.value = '';
    otraWrap.style.display = 'none';
    renderizar();
}

function marcarHecha(id) {
    const tarea = tareas.find(t => t.id === id);
    tarea.hecha = !tarea.hecha;
    console.log('Estado actual de la tarea:', tarea.hecha);
    renderizar();
}

function marcarUrgente(id) {
    const tarea = tareas.find(t => t.id === id);
    tarea.urgente = !tarea.urgente;
    console.log('Tarea urgente:', tarea.urgente);
    renderizar();
}

function eliminarTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    const confirmar = confirm(
        `¿Deseas eliminar la tarea "${tarea.texto}"?`
    );
    if (confirmar) {
        tareas = tareas.filter(t => t.id !== id);
        console.log('La tarea fue eliminada');
        renderizar();
    }
}

function limpiarCompletadas() {
    const completadas = tareas.filter(t => t.hecha);
    if (completadas.length === 0) {
        alert('No hay tareas completadas');
        return;
    }
    const confirmar = confirm(
        `¿Deseas eliminar ${completadas.length} tarea(s) completada(s)?`
    );
    if (confirmar) {
        tareas = tareas.filter(t => !t.hecha);
        console.log('Las tareas completadas ya estan eliminadas');
        renderizar();
    }
}

function actualizarContador() {
    spanTotal.textContent = tareas.length;
    spanCompletadas.textContent =
        tareas.filter(t => t.hecha).length;
}

function renderizar() {
    listaTareas.innerHTML = '';
    if (tareas.length === 0) {
        listaVacia.style.display = 'block';
    } else {
        listaVacia.style.display = 'none';
    }
    tareas.forEach(function (tarea) {
        const li = document.createElement('li');
        li.classList.add('tarea-card');
        if (tarea.hecha) {
            li.classList.add('hecha');
        }
        if (tarea.urgente) {
            li.classList.add('urgente');
        }
        li.innerHTML = `
            <div style="flex:1;">
                <div class="tarea-texto">${tarea.texto}</div>
                <div class="cat-label">${tarea.categoria}</div>
            </div>
            <div class="acciones">
                <button
                    class="btn-accion btn-hecha"
                    onclick="marcarHecha(${tarea.id})">
                    ${tarea.hecha ? 'Deshacer' : 'Hecha'}
                </button>
                <button
                    class="btn-accion btn-urgente"
                    onclick="marcarUrgente(${tarea.id})">
                    ${tarea.urgente ? 'Normal' : 'Urgente'}
                </button>
                <button
                    class="btn-accion btn-eliminar"
                    onclick="eliminarTarea(${tarea.id})">
                    Eliminar
                </button>
            </div>
        `;
        listaTareas.appendChild(li);
    });
    actualizarContador();
}

inputTarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        console.log('Enter presionado');
        agregarTarea();
    }
});

btnAgregar.addEventListener('click', agregarTarea);
console.log('Task Manager iniciado');
renderizar();
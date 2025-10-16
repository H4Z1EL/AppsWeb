// Elementos del DOM
const formularioTareas = document.getElementById('formularioTareas');
const inputNuevaTarea = document.getElementById('nuevaTarea');
const listaTareas = document.getElementById('listaTareas');

// Array para almacenar las tareas
let tareas = [];

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', cargarTareas);
formularioTareas.addEventListener('submit', agregarTarea);

function agregarTarea(evento) {
    evento.preventDefault();
    const textoTarea = inputNuevaTarea.value.trim();
    
    if (textoTarea !== '') {
        tareas.push({
            texto: textoTarea,
            completada: false
        });
        
        mostrarTareas();
        guardarTareas();
        inputNuevaTarea.value = '';
    }
}

function mostrarTareas() {
    listaTareas.innerHTML = '';
    
    tareas.forEach((tarea, indice) => {
        const elementoLista = document.createElement('li');
        elementoLista.textContent = tarea.texto;
        
        if (tarea.completada) {
            elementoLista.classList.add('completada');
        }
        
        elementoLista.addEventListener('click', () => marcarComoCompletada(indice));
        listaTareas.appendChild(elementoLista);
    });
}

function marcarComoCompletada(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    mostrarTareas();
    guardarTareas();
}

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        mostrarTareas();
    }
}
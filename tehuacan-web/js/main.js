// ==========================================================
// main.js — Funciones generales: menú de celular, eventos,
// encuesta y formulario de contacto
// ==========================================================

// Pequeña ayuda para guardar/leer del navegador sin que truene
function leerGuardado(clave, valorPorDefecto) {
  try {
    const dato = localStorage.getItem(clave);          // busca el dato
    return dato ? JSON.parse(dato) : valorPorDefecto;  // si no hay, usa el default
  } catch (e) { return valorPorDefecto; }              // si falla, no pasa nada
}
function guardar(clave, valor) {
  try { localStorage.setItem(clave, JSON.stringify(valor)); } catch (e) {}
}

// ---------- Menú hamburguesa (celular) ----------
const botonMenu = document.querySelector(".hamburguesa"); // botón ☰
const listaMenu = document.querySelector(".menu ul");     // lista de links
if (botonMenu) {
  botonMenu.addEventListener("click", () => {
    listaMenu.classList.toggle("abierto");                // abre o cierra
  });
}

// ---------- Próximos eventos (solo en el Inicio) ----------
const contEventos = document.getElementById("lista-eventos");
if (contEventos && typeof EVENTOS !== "undefined") {
  EVENTOS.forEach(ev => {                                 // por cada evento...
    contEventos.innerHTML += `
      <article class="evento">
        <p class="fecha">📅 ${ev.fecha}</p>
        <h3>${ev.titulo}</h3>
        <p>${ev.texto}</p>
      </article>`;                                        // ...crea su tarjeta
  });
}

// ---------- Encuesta "¿Controversial?" (página del mole) ----------
const encuesta = document.getElementById("encuesta");
if (encuesta) {
  let votos = leerGuardado("votosMole", { favor: 0, contra: 0 }); // votos guardados
  const yaVoto = () => leerGuardado("yaVotoMole", false);          // ¿ya votó?

  function pintarResultados() {
    const total = votos.favor + votos.contra || 1;                  // evita dividir entre 0
    const pFavor = Math.round(votos.favor / total * 100);
    const pContra = Math.round(votos.contra / total * 100);
    document.getElementById("barra-favor").style.width = Math.max(pFavor, 8) + "%";
    document.getElementById("barra-favor").textContent = `Tradición ${pFavor}%`;
    document.getElementById("barra-contra").style.width = Math.max(pContra, 8) + "%";
    document.getElementById("barra-contra").textContent = `Cambiar ${pContra}%`;
    document.getElementById("resultados").hidden = false;           // muestra barras
  }

  encuesta.querySelectorAll("[data-voto]").forEach(boton => {
    boton.addEventListener("click", () => {
      if (yaVoto()) { pintarResultados(); return; }                 // un voto por persona
      votos[boton.dataset.voto]++;                                  // suma el voto
      guardar("votosMole", votos);
      guardar("yaVotoMole", true);
      document.getElementById("gracias").textContent = "¡Gracias por votar! 💬";
      pintarResultados();
    });
  });
  if (yaVoto()) pintarResultados();                                 // si ya votó, enseña resultados
}

// ---------- Formulario de contacto ----------
const formulario = document.getElementById("form-contacto");
if (formulario) {
  formulario.addEventListener("submit", evento => {
    evento.preventDefault();                                        // no recarga la página
    const mensajes = leerGuardado("mensajesContacto", []);          // lista de mensajes
    mensajes.push({
      nombre: formulario.nombre.value,
      correo: formulario.correo.value,
      mensaje: formulario.mensaje.value,
      fecha: new Date().toLocaleString("es-MX")
    });
    guardar("mensajesContacto", mensajes);                          // guarda el nuevo
    formulario.reset();                                             // limpia campos
    document.getElementById("confirmacion").textContent = "¡Mensaje enviado! Te responderemos pronto 💌";
  });
}

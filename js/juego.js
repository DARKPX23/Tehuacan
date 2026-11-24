// ==========================================================
// juego.js — Minijuego "Prepara el mole de caderas" 🍲
// Nivel 1: elegir ingredientes | Nivel 2: ordenar pasos | Nivel 3: servir
// ==========================================================

const zonaJuego = document.getElementById("juego");        // caja del juego
const contenido = document.getElementById("juego-contenido"); // donde se dibuja cada nivel
const barra = document.getElementById("juego-barra");       // barra de progreso
const textoNivel = document.getElementById("juego-nivel");  // "Nivel 1 de 3"
const textoTiempo = document.getElementById("juego-tiempo");// cronómetro

let errores = 0;          // cuántas veces se equivocó
let segundos = 0;         // tiempo jugado
let reloj = null;         // intervalo del cronómetro

// Revuelve una lista (para que las opciones no salgan siempre igual)
function revolver(lista) {
  return [...lista].sort(() => Math.random() - 0.5);
}

// ---------- Iniciar juego ----------
function iniciarJuego() {
  errores = 0; segundos = 0;
  zonaJuego.classList.add("visible");                       // muestra el juego
  zonaJuego.scrollIntoView({ behavior: "smooth" });         // baja hasta él
  clearInterval(reloj);
  reloj = setInterval(() => {                               // cuenta segundos
    segundos++;
    textoTiempo.textContent = `⏱️ ${segundos} s`;
  }, 1000);
  nivelIngredientes();
}

// ---------- Nivel 1: ingredientes ----------
function nivelIngredientes() {
  textoNivel.textContent = "Nivel 1 de 3 · Elige los ingredientes";
  barra.style.width = "10%";
  const faltan = INGREDIENTES.filter(i => i.correcto).length; // cuántos correctos hay
  let encontrados = 0;

  contenido.innerHTML = `
    <p>Toca los <b>3 ingredientes</b> que llevan el mole de caderas. ¡Cuidado con las trampas! 😏</p>
    <div class="olla-juego">🍲<small id="en-olla">Olla: 0 / ${faltan}</small></div>
    <div class="opciones" id="ops"></div>
    <p class="mensaje" id="msg"></p>`;

  const ops = document.getElementById("ops");
  revolver(INGREDIENTES).forEach(ing => {
    const b = document.createElement("button");             // botón por ingrediente
    b.className = "opcion";
    b.innerHTML = `<span>${ing.emoji}</span>${ing.nombre}`;
    b.onclick = () => {
      if (ing.correcto) {                                   // ✅ correcto
        b.classList.add("bien"); b.disabled = true;
        encontrados++;
        document.getElementById("en-olla").textContent = `Olla: ${encontrados} / ${faltan}`;
        document.getElementById("msg").textContent = `¡${ing.nombre} a la olla! 👌`;
        barra.style.width = (10 + encontrados / faltan * 30) + "%";
        if (encontrados === faltan) setTimeout(nivelPasos, 800); // pasa de nivel
      } else {                                              // ❌ trampa
        errores++;
        b.classList.add("mal");
        document.getElementById("msg").textContent = `Mmm, ${ing.nombre.toLowerCase()} no va en este mole 😅`;
        setTimeout(() => b.classList.remove("mal"), 400);
      }
    };
    ops.appendChild(b);
  });
}

// ---------- Nivel 2: ordenar pasos ----------
function nivelPasos() {
  textoNivel.textContent = "Nivel 2 de 3 · Ordena la preparación";
  barra.style.width = "45%";
  let siguiente = 0;                                        // paso que toca

  contenido.innerHTML = `
    <p>Toca los pasos <b>en orden</b>, del primero al último 👩‍🍳</p>
    <ol class="lista-pasos" id="hechos" style="margin:1rem 0 1.5rem"></ol>
    <div class="opciones" id="ops"></div>
    <p class="mensaje" id="msg"></p>`;

  const ops = document.getElementById("ops");
  revolver(PASOS).forEach(paso => {
    const b = document.createElement("button");
    b.className = "opcion";
    b.textContent = paso;
    b.onclick = () => {
      if (paso === PASOS[siguiente]) {                      // ✅ es el que sigue
        b.classList.add("bien"); b.disabled = true;
        document.getElementById("hechos").innerHTML += `<li>${paso} ✔️</li>`;
        siguiente++;
        barra.style.width = (45 + siguiente / PASOS.length * 40) + "%";
        document.getElementById("msg").textContent = "¡Eso! 🔥";
        if (siguiente === PASOS.length) setTimeout(nivelServir, 800);
      } else {                                              // ❌ no toca todavía
        errores++;
        b.classList.add("mal");
        document.getElementById("msg").textContent = "Ese paso todavía no toca 🤔";
        setTimeout(() => b.classList.remove("mal"), 400);
      }
    };
    ops.appendChild(b);
  });
}

// ---------- Nivel 3: servir y resultado ----------
function nivelServir() {
  clearInterval(reloj);                                     // detiene el tiempo
  textoNivel.textContent = "Nivel 3 de 3 · ¡A servir!";
  barra.style.width = "100%";

  // Estrellas según los errores
  const estrellas = errores === 0 ? 3 : errores <= 3 ? 2 : 1;

  // Récord guardado en el navegador
  let record = null;
  try { record = Number(localStorage.getItem("recordMole")) || null; } catch (e) {}
  const nuevoRecord = record === null || segundos < record;
  if (nuevoRecord) { try { localStorage.setItem("recordMole", segundos); } catch (e) {} }

  const dato = DATOS_CURIOSOS[Math.floor(Math.random() * DATOS_CURIOSOS.length)];

  contenido.innerHTML = `
    <div class="resultado">
      <div style="font-size:5rem">🍲</div>
      <h3>¡Tu mole de caderas está listo!</h3>
      <div class="estrellas">${"⭐".repeat(estrellas)}${"☆".repeat(3 - estrellas)}</div>
      <p>Tiempo: <b>${segundos} s</b> · Errores: <b>${errores}</b></p>
      <p>${nuevoRecord ? "🏆 ¡Nuevo récord!" : `Tu récord: ${record} s`}</p>
      <p class="dato">💡 ${dato}</p>
      <div class="botones">
        <a class="boton" href="mole.html">Conoce la historia del mole</a>
        <a class="boton aqua" href="manantial.html">Visita el Manantial 💧</a>
        <button class="boton claro" onclick="iniciarJuego()">🔁 Jugar otra vez</button>
      </div>
    </div>`;
}

// Botón "Jugar" del banner
document.getElementById("boton-jugar").addEventListener("click", iniciarJuego);

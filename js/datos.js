// ==========================================================
// datos.js — Aquí vive TODA la información editable del sitio
// (gestión de información: se cambia aquí sin tocar el HTML)
// ==========================================================

// Ingredientes del minijuego: correcto = true si va en el mole
const INGREDIENTES = [
  { nombre: "Caderas de chivo", emoji: "🦴", correcto: true },
  { nombre: "Guajes",           emoji: "🫛", correcto: true },
  { nombre: "Chile costeño",    emoji: "🌶️", correcto: true },
  { nombre: "Pollo",            emoji: "🍗", correcto: false }, // trampa
  { nombre: "Chocolate",        emoji: "🍫", correcto: false }, // trampa
  { nombre: "Piña",             emoji: "🍍", correcto: false }  // trampa
];

// Pasos de preparación en el ORDEN correcto
const PASOS = [
  "Hervir las caderas de chivo",
  "Tostar y moler el chile costeño",
  "Moler los guajes",
  "Mezclar todo en el caldo y sazonar",
  "Servir bien caliente"
];

// Datos curiosos que aparecen al terminar el juego
const DATOS_CURIOSOS = [
  "Al agua mineral en México se le dice 'un Tehuacán' por los manantiales de esta ciudad 💧",
  "El mole de caderas es Patrimonio Cultural Intangible de Puebla desde 2023 🏅",
  "El nombre Peñafiel viene de una peña que por años ha hecho brotar agua 🪨",
  "Los chivos del mole de caderas vienen pastoreando desde la Mixteca 🐐"
];

// Próximos eventos que se muestran en el Inicio
const EVENTOS = [
  { fecha: "Mediados de octubre", titulo: "Festival Étnico de La Matanza", texto: "Arranca la temporada del mole de caderas." },
  { fecha: "Octubre – noviembre", titulo: "Temporada de mole de caderas", texto: "Restaurantes de Tehuacán sirven el platillo de temporada." },
  { fecha: "Todo el año",         titulo: "Visita al Manantial Peñafiel", texto: "Recorre el museo y conoce la historia del agua mineral." }
];

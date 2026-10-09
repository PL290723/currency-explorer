// ============================================================
// CURRENCY EXPLORER · STARTER PROJECT
// Archivo principal de trabajo para las misiones de JavaScript
// ============================================================

// 1. REFERENCIAS AL DOM
const cantidad = document.querySelector("#cantidad");
const origen = document.querySelector("#origen");
const destino = document.querySelector("#destino");
const btnConvertir = document.querySelector("#convertir");
const btnIntercambiar = document.querySelector("#intercambiar");
const resultado = document.querySelector("#resultado");
const resultadoTexto = document.querySelector("#resultadoTexto");
const detalleTasa = document.querySelector("#detalleTasa");

// 2. EVENTOS
btnConvertir.addEventListener("click", convertirMoneda);
btnIntercambiar.addEventListener("click", intercambiarMonedas);

// 3. FUNCIÓN PRINCIPAL
async function convertirMoneda() {
  const valor = Number(cantidad.value);

  if (!Number.isFinite(valor) || valor <= 0) {
    mostrarError("Ingresa una cantidad mayor a 0.");
    return;
  }

  const monedaOrigen = origen.value;
  const monedaDestino = destino.value;

  const url = `https://api.frankfurter.dev/v2/rate/${monedaOrigen}/${monedaDestino}`;

  // MISIÓN 08: activar el estado de carga antes de la petición.
  resultadoTexto.textContent = "Consultando...";
  detalleTasa.textContent = "Obteniendo la tasa de cambio...";
  btnConvertir.disabled = true;

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error("Error en la consulta");
    }

    const datos = await respuesta.json();

    const conversion = (valor * datos.rate).toFixed(2);

    resultado.classList.remove("error");
    resultadoTexto.textContent = `${valor.toFixed(2)} ${monedaOrigen} = ${conversion} ${monedaDestino}`;
    detalleTasa.textContent = `1 ${monedaOrigen} = ${datos.rate} ${monedaDestino} · ${datos.date}`;

  } catch (error) {
    mostrarError("No fue posible completar la consulta.");
    console.error(error);
  } finally {
    // MISIÓN 08: restaurar el botón al finalizar la consulta.
    btnConvertir.disabled = false;
  }
}

function intercambiarMonedas() {
  const temporal = document.querySelector("#origen").value;
  document.querySelector("#origen").value = document.querySelector("#destino").value;
  document.querySelector("#destino").value = temporal;

  convertirMoneda();
}

// 4. UTILIDADES DE INTERFAZ
function mostrarError(mensaje) {
  resultado.classList.add("error");
  resultadoTexto.textContent = mensaje;
  detalleTasa.textContent = "Revisa los datos e inténtalo nuevamente.";
}

// PISTA PARA EL RETO:
// origen.value        -> moneda seleccionada como origen
// destino.value       -> moneda seleccionada como destino
// cantidad.value      -> texto escrito en el input
// Number(...)         -> convierte texto a número
// resultado.textContent -> permite modificar texto del DOM

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

  // MISIÓN 11: endpoint de series temporales con rango de fechas y agrupación mensual.
  const desde = "2026-01-01";
  const url = `https://api.frankfurter.dev/v2/rates?base=${monedaOrigen}&quotes=${monedaDestino}&from=${desde}&group=month`;

  // MISIÓN 08: activar el estado de carga antes de la petición.
  resultadoTexto.textContent = "Consultando...";
  detalleTasa.textContent = "Obteniendo la serie histórica...";
  btnConvertir.disabled = true;

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error("Error en la consulta");
    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos) || datos.length === 0) {
      throw new Error("Sin datos para el rango solicitado");
    }

    // MISIÓN 11: separar la serie en dos arreglos con Array.map().
    const fechas = datos.map((registro) => registro.date); // eje X
    const tasas = datos.map((registro) => registro.rate);  // eje Y

    // Última tasa disponible: se usa para la conversión actual.
    const tasaActual = tasas[tasas.length - 1];
    const fechaActual = fechas[fechas.length - 1];
    const conversion = (valor * tasaActual).toFixed(2);

    resultado.classList.remove("error");
    resultadoTexto.textContent = `${valor.toFixed(2)} ${monedaOrigen} = ${conversion} ${monedaDestino}`;
    detalleTasa.textContent = `1 ${monedaOrigen} = ${tasaActual} ${monedaDestino} · ${fechaActual}`;

    // MISIÓN 11: inyectar la serie en el DOM (gráfica + tabla dinámica).
    renderizarSerie(fechas, tasas, monedaOrigen, monedaDestino);

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

// 4. VISUALIZACIÓN DE LA SERIE TEMPORAL (MISIÓN 11)
function renderizarSerie(fechas, tasas, monedaOrigen, monedaDestino) {
  const contenedor = document.querySelector("#serie");

  // Gráfica SVG construida a partir de los dos arreglos.
  const ancho = 600;
  const alto = 200;
  const margen = 34;
  const min = Math.min(...tasas);
  const max = Math.max(...tasas);
  const rango = max - min || 1;
  const pasoX = (ancho - margen * 2) / Math.max(fechas.length - 1, 1);

  const puntos = tasas.map((tasa, i) => {
    const x = margen + i * pasoX;
    const y = alto - margen - ((tasa - min) / rango) * (alto - margen * 2);
    return { x, y };
  });

  const linea = puntos.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const circulos = puntos
    .map((p, i) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3"><title>${fechas[i]}: ${tasas[i]}</title></circle>`)
    .join("");

  const grafica = `
    <svg class="serie-chart" viewBox="0 0 ${ancho} ${alto}" role="img" aria-label="Evolución de la tasa de cambio">
      <polyline points="${linea}" fill="none" stroke="#16758b" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></polyline>
      ${circulos}
    </svg>`;

  // Tabla dinámica: cada fila se genera recorriendo los arreglos.
  const filas = fechas
    .map((fecha, i) => `<tr><td>${fecha}</td><td>${tasas[i]}</td></tr>`)
    .join("");

  const tabla = `
    <table class="serie-table">
      <thead>
        <tr><th>Fecha</th><th>1 ${monedaOrigen} → ${monedaDestino}</th></tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>`;

  contenedor.innerHTML = `
    <span class="result-label">SERIE HISTÓRICA · ${monedaOrigen} → ${monedaDestino}</span>
    ${grafica}
    ${tabla}`;
}

// 5. UTILIDADES DE INTERFAZ
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

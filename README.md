# Currency Explorer · Starter Project

## Integrantes
- Estudiante A: Rivera Lara Paulo Cesar
- Estudiante B: Melgar Obrajero Jairo Antonio

## Pair Programming
| Misión | Driver | Navigator | Commit / evidencia |
|---|---|---|---|
| 04 |Paulo |Jairo |https://github.com/PL290723/currency-explorer/pull/1 |
| 05 |Jairo |Paulo |https://github.com/PL290723/currency-explorer/pull/2 |
| 06 |Paulo |Jairo |https://github.com/PL290723/currency-explorer/pull/3 |
| 07 |Jairo |Paulo |https://github.com/PL290723/currency-explorer/pull/4 |
| 08 |Paulo |Jairo |https://github.com/PL290723/currency-explorer/pull/5 |
| 09 |Jairo |Paulo |https://github.com/PL290723/currency-explorer/pull/6 |
| 10 |Paulo |Jairo |https://github.com/PL290723/currency-explorer/pull/7 |

## Objetivo
Completar una aplicación frontend que consuma Frankfurter API para convertir divisas y demostrar comprensión de eventos, DOM, `fetch()`, JSON, asincronía, validación y manejo de errores.

## Ejecución
1. Descomprime el proyecto.
2. Abre la carpeta en VS Code.
3. Ejecuta `index.html` con Live Server o un servidor local equivalente.
4. Abre DevTools → Console y Network para observar el comportamiento.

## API
Endpoint de referencia:
`https://api.frankfurter.dev/v2/rate/{origen}/{destino}`

## Decisiones técnicas
Registra aquí al menos dos decisiones tomadas por la pareja y explica por qué.

1. Jairo (Navigator) anticipó que los campos de texto podrían estar vacíos o recibir datos no numéricos. Decidimos usar estas herramientas para capturar el error y evitar que la aplicación se rompa, permitiendo mostrar un mensaje claro al usuario en lugar de un fallo en consola.
2. Decidimos usar la interpolación con comillas invertidas (${monedaOrigen}/${monedaDestino}) en lugar de concatenar cadenas de texto con el símbolo +. Esto hace que la URL de la API sea mucho más legible, limpia y menos propensa a errores de sintaxis al inyectar las divisas dinámicas.

## Revisión cruzada
- Aspecto bien resuelto: La implementacion de cada una de las misiones
- Error o comportamiento mejorable: Fallo en merge de las ramas y commits
- Propuesta de mejora: Aprender a hacer buenos pull request
- Cambio incorporado después de la revisión: Aprender a trabajar mejor con API's.

## Reflexión final (150–200 palabras)
Explica el principal aprendizaje técnico, una dificultad relevante y una decisión que haya surgido del trabajo Driver/Navigator.

El principal aprendizaje técnico fue comprender el ciclo de asincronía en JavaScript y su conexión directa con el DOM. Dejamos de ver fetch() como una simple receta memorizada para entender realmente el recorrido completo de los datos: desde la solicitud HTTP y la espera de la respuesta JSON sin bloquear la interfaz, hasta la extracción de valores para actualizar el contenido. 
La dificultad más relevante surgió al integrar y validar los tipos de datos entre la interfaz y la API. Comprendimos que los inputs siempre entregan texto y la red devuelve un objeto estructurado, lo que nos obligó a manejar la lógica cuidadosamente para no operar con valores inválidos antes de que la promesa se resolviera. 
Una decisión técnica clave surgida del Pair Programming ocurrió al estructurar las validaciones. Mientras yo escribía el código de conversión asumiendo el rol de Driver, Jairo, actuando como Navigator, anticipó el riesgo de que el usuario dejara los campos vacíos o introdujera números negativos. Su observación oportuna nos llevó a implementar Number() y a estructurar el bloque asíncrono dentro de un try/catch para manejar los errores con elegancia. 
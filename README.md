# Taller de Prueba de Carga
## Grupo A – Enunciado: Evaluación de rendimiento en sistema de reservas de salas
### Contexto
La biblioteca central de la universidad ha implementado una aplicación web para la
reserva de salas de estudio. Para realizar una reserva, los estudiantes deben crear una
cuenta, iniciar sesión y enviar una solicitud con la fecha, hora y número de sala. Se desea
evaluar el rendimiento del sistema ante un número creciente de usuarios que realizan
estas acciones simultáneamente.
### Objetivo
Ejecutar pruebas de carga progresiva utilizando la herramienta k6, simulando el
comportamiento real de usuarios desde el registro (usar sus nombres para la creación de
usuarios y reservas) hasta la creación de una reserva de sala, con el fin de identificar los
límites de rendimiento del sistema.
### Actividades
1. Crear un script de k6 llamado apellido-nombre.js que incluya:
    * POST /api/auth/register con correo único.
    * POST /api/auth/login para obtener el token.
    * POST /api/reservas con un JSON representando una reserva de sala (ej.fecha, hora, sala).
2. Ejecutar cuatro pruebas independientes, una para cada carga de usuarios virtuales:
    * 30 usuarios virtuales por 30 segundos
    * 50 usuarios virtuales por 30 segundos
    * 70 usuarios virtuales por 30 segundos
    * 90 usuarios virtuales por 30 segundos
3. Registrar y comparar para cada prueba:
    * Tiempo promedio y máximo de respuesta
    * % de errores (http_req_failed)
    * Solicitudes por segundo (http_reqs)
    * Iteraciones completadas
4. Presentar los resultados en una tabla comparativa.
5. 5. Analizar: ¿A partir de qué carga el sistema comienza a degradarse? ¿Qué parte del flujo es más crítica?
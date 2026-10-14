# INFORME-INFYCREDIT

Dashboard independiente para InfyCredit. HTML, CSS y JavaScript sin dependencias de producción. Logo original suministrado por el usuario. Inspirado en la funcionalidad de INFORME-VIRTUALCREDIT, sin modificar ese repositorio.

Cinco pestañas: Evolución por entidad, Consumos por entidad, Bolsa Cooptraiss, Otros cobros y Evolución de la bolsa. Filtros, gráficos, matrices, descarga JSON, fuente editable en Sheets y actualización automática cada minuto.

## Datos y cálculo

Google Sheets: https://docs.google.com/spreadsheets/d/1RwsJdNCZlV2D1ytso8DO9mT0BLn-3kZZ/edit?gid=1884511646

Bolsa exclusiva de Cooptraiss: 12.000 análisis. Otras entidades por demanda. Identidad/campañas/mensajes no descuentan análisis. No se inventan tarifas. Meses sin registros pendientes, no cero. Vigencia inclusiva 01/04/2026–30/04/2027 (13 meses).

La carga valida encabezados, periodos, enteros no negativos, duplicados y totales. Si Sheets falla, se conserva únicamente la consulta de la sesión y se muestra una advertencia. Este repositorio no contiene datos de la hoja ni respaldos. Mantener la hoja accesible para consulta pública mediante su enlace de exportación. Los visitantes editan datos en Sheets según sus permisos.

## Probar y publicar

`npm test` verifica cálculos y rechazo de datos inválidos. `python -m http.server 8080` sirve una vista local. Publicación con GitHub Pages desde main, carpeta raíz. No requiere compilación ni secretos. URL esperada tras activar Pages: https://soporte182.github.io/INFORME-INFYCREDIT/

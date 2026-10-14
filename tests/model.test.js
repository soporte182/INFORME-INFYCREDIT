import {test} from 'node:test';import assert from 'node:assert/strict';import {parseCsv,bagRows,sum,bagMonths,BAG} from '../data-model.js';
// Synthetic fixtures only. No spreadsheet records are distributed.
const header='Año,NUMERO MES,Entidad,Validación de identidad,Análisis deudor,Análisis codeudor,Total consumo,Campañas,Mensajes';
const csv=header+'\n2026,3,COOPTRAISS,1,10,2,12,0,0\n2026,4,COOPTRAISS,1,20,3,23,0,0\n2026,4,DEMANDA,2,50,0,50,1,2\n2027,4,COOPTRAISS,0,30,4,34,0,0\n2027,5,COOPTRAISS,0,80,0,80,0,0';
test('bolsa exclusiva y límites inclusivos de 13 meses',()=>{const rows=parseCsv(csv);assert.equal(sum(bagRows(rows)),57);assert.equal(BAG-sum(bagRows(rows)),11943);assert.equal(bagMonths.length,13);assert.equal(bagMonths[0],'2026-04');assert.equal(bagMonths.at(-1),'2027-04');});
test('rechaza totales inconsistentes y duplicados',()=>{assert.throws(()=>parseCsv(csv.replace(',23,',',24,')),/inconsistente/);assert.throws(()=>parseCsv(csv+'\n'+csv.split('\n')[1]),/duplicado/);});
test('rechaza cantidades negativas y meses invalidos',()=>{assert.throws(()=>parseCsv(csv.replace('2026,3,','2026,13,')),/periodo/);assert.throws(()=>parseCsv(csv.replace(',10,',',-10,')),/inválidas/);});

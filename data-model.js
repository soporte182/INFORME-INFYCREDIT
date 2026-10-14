export const BAG=12000, START='2026-04', END='2027-04';
export const bagMonths=Array.from({length:13},(_,i)=>`${2026+Math.floor((i+3)/12)}-${String((i+3)%12+1).padStart(2,'0')}`);
export function parseCsv(text){
 const records=[];let row=[],cell='',quoted=false;
 for(let i=0;i<text.length;i++){const c=text[i];if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(!quoted&&[',','\n','\r'].includes(c)){row.push(cell);cell='';if(c!==','){records.push(row);row=[];if(c==='\r'&&text[i+1]==='\n')i++;}}else cell+=c;}
 if(quoted)throw Error('Comillas sin cerrar en la fuente.');if(cell||row.length){row.push(cell);records.push(row);}
 const clean=s=>s.replace(/^\uFEFF/,'').trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();const headers=(records.shift()||[]).map(clean);
 const required=['ano','numero mes','entidad','validacion de identidad','analisis deudor','analisis codeudor','total consumo','campanas','mensajes'];const cols=required.map(h=>headers.indexOf(h));if(cols.some(i=>i<0))throw Error('Faltan columnas requeridas.');const seen=new Set();
 const rows=records.filter(r=>r.some(v=>v.trim())).map((r,i)=>{const v=cols.map(c=>(r[c]||'').trim());const numeric=[0,1,3,4,5,6,7,8];if(numeric.some(c=>!/^\d+$/.test(v[c])||!Number.isSafeInteger(Number(v[c]))))throw Error(`Fila ${i+2}: cantidades inválidas.`);const [year,month]=v.map(Number);if(year<2000||year>2100||month<1||month>12||!v[2])throw Error(`Fila ${i+2}: periodo o entidad inválidos.`);const period=`${year}-${String(month).padStart(2,'0')}`;const entity=v[2].toUpperCase();const key=period+'|'+entity;if(seen.has(key))throw Error(`Registro duplicado: ${entity} ${period}.`);seen.add(key);const identity=Number(v[3]),debtor=Number(v[4]),codebtor=Number(v[5]),total=Number(v[6]);if(total!==debtor+codebtor)throw Error(`Total inconsistente: ${entity} ${period}.`);return {period,entity,identity,debtor,codebtor,total,campaigns:Number(v[7]),messages:Number(v[8])};});if(!rows.length)throw Error('La fuente no contiene registros.');return rows.sort((a,b)=>a.period.localeCompare(b.period)||a.entity.localeCompare(b.entity));
}
export const sum=(rows,key='total')=>rows.reduce((s,r)=>s+r[key],0);
export const bagRows=rows=>rows.filter(r=>r.entity==='COOPTRAISS'&&r.period>=START&&r.period<=END);

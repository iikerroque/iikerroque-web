// Comprueba que cada bloque coincide exactamente con lo que genera el editor de WordPress.
import fs from 'node:fs';
import { blocks } from './entorno.mjs';
let bad = 0;
const check = (list, file) => list.forEach((b) => {
  if (!b.name) return;
  if (b.name === 'core/missing') { bad++; console.log(`✗ ${file}: bloque desconocido ${b.attributes.originalName}`); return; }
  const [ok] = blocks.validateBlock(b);
  if (!ok || b.isValid === false) {
    bad++;
    console.log(`✗ ${file}: ${b.name}`);
    console.log('   original:', b.originalContent.slice(0, 400));
    console.log('   esperado:', blocks.getSaveContent(b.name, b.attributes, b.innerBlocks).slice(0, 400));
  }
  check(b.innerBlocks, file);
});
for (const f of process.argv.slice(2)) check(blocks.parse(fs.readFileSync(f, 'utf8')), f);
console.log(bad ? `${bad} bloque(s) no válidos` : `OK: todos los bloques son válidos (${process.argv.length - 2} archivos)`);
process.exit(bad ? 1 : 0);

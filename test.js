const fs = require('fs');
const xml2js = require('xml2js');

const xmlPath = 'C:/Users/anddc/Documents/VirtualDJ/database.xml'; // Asegúrate de que exista

fs.readFile(xmlPath, (err, data) => {
  if (err) {
    console.error('❌ ERROR al leer el archivo:', err.message);
    return;
  }

  console.log('✅ Archivo leído correctamente');

  xml2js.parseString(data, (err, result) => {
    if (err) {
      console.error('❌ Error al parsear XML:', err.message);
      return;
    }

    console.log('✅ Contenido XML parseado correctamente');

    const canciones = result.VirtualDJDatabase?.Song || [];
    console.log(`📀 Se encontraron ${canciones.length} canciones`);

    // Mostrar los primeros 5 títulos como prueba
    canciones.slice(0, 5).forEach((song, i) => {
      const title = song.Tags?.[0]?.$.Title || 'Sin título';
      console.log(`🎵 ${i + 1}. ${title}`);
    });
  });
});

const fs = require('fs');

const ruta = 'C:/Users/anddc/OneDrive/Documentos/VirtualDJ/database.xml';

fs.readFile(ruta, (err, data) => {
  if (err) {
    console.error('❌ ERROR al leer el archivo:', err.message);
  } else {
    console.log('✅ Archivo leído correctamente');
    console.log('Contenido:', data.toString().slice(0, 200)); // Solo muestra los primeros 200 caracteres
  }
});

const fs = require('fs');
const xmlPath = 'C:/Users/anddc/OneDrive/Documentos/VirtualDJ/database.xml';

fs.access(xmlPath, fs.constants.F_OK, (err) => {
  if (err) {
    console.error('❌ El archivo NO se encuentra en la ruta especificada');
  } else {
    console.log('✅ El archivo SÍ existe y se puede acceder');
  }
});

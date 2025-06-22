const express = require('express');
const cors = require('cors');
const fs = require('fs');
const xml2js = require('xml2js');

const app = express();
const PORT = 3001;

// Ruta corregida al archivo XML de VirtualDJ
const xmlPath = 'C:/Users/anddc/OneDrive/Documentos/VirtualDJ/database.xml';

app.use(cors());

app.get('/api/canciones', (req, res) => {
  fs.readFile(xmlPath, (err, data) => {
    if (err) {
      console.error('❌ ERROR al leer el archivo:', err.message);
      return res.status(500).json({ error: 'No se pudo leer el archivo de VirtualDJ' });
    }

    xml2js.parseString(data, (err, result) => {
      if (err) {
        console.error('❌ ERROR al parsear XML:', err.message);
        return res.status(500).json({ error: 'Error procesando el archivo XML' });
      }

      const canciones = [];

      const cancionesRaw = result.VirtualDJ_Database?.Song || [];

      cancionesRaw.forEach(song => {
        canciones.push({
          titulo: song.Tags?.[0]?.$.Title || 'Sin título',
          autor: song.Tags?.[0]?.$.Author || 'Desconocido',
          genero: song.Tags?.[0]?.$.Genre || 'Otro',
          filePath: song.$.FilePath || ''
        });
      });

      res.json(canciones);
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});

const fs = require('fs');
const xml2js = require('xml2js');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// 🛡️ Middleware
app.use(cors());
app.use(express.json()); // ← debe estar aquí, no dentro de otros bloques

// 📂 Ruta al archivo XML
const xmlPath = './database.xml';

// 📥 Obtener canciones
app.get('/api/canciones', (req, res) => {
  fs.readFile(xmlPath, (err, data) => {
    if (err) {
      console.error('❌ Error leyendo el archivo:', err);
      return res.status(500).json({ error: 'No se pudo leer el archivo de VirtualDJ' });
    }

    xml2js.parseString(data, (err, result) => {
      if (err) {
        console.error('❌ Error parseando XML:', err);
        return res.status(500).json({ error: 'Error al procesar el archivo XML' });
      }

      const canciones = [];
      const cancionesRaw = result.VirtualDJ_Database?.Song || [];

      for (const song of cancionesRaw) {
        const filePath = song.$.FilePath || '';
        const title = song.Tags?.[0]?.$.Title || 'Sin título';
        const author = song.Tags?.[0]?.$.Author || 'Desconocido';
        const genero = song.Tags?.[0]?.$.Genre || 'Otro';

        canciones.push({
          titulo: title,
          autor: author,
          genero,
          filePath,
        });
      }

      res.json(canciones);
    });
  });
});

// 🎵 Guardar canción seleccionada
app.post('/api/seleccion', (req, res) => {
  const { nombre, mesa, titulo, autor, genero } = req.body;

  if (!nombre || !mesa || !titulo) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  console.log(`🎧 Canción recibida: ${titulo} (${genero}) por ${autor}, mesa ${mesa}, cliente ${nombre}`);
  res.json({ mensaje: 'Canción recibida correctamente' });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});

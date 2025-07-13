const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/userRoutes');
const voitureRoutes = require('./routes/voitureRoutes');
app.use('/api', authRoutes);
app.use('/api/voitures', voitureRoutes);
app.listen(5000, () => {
    console.log('🚀 Serveur backend démarré sur http://localhost:5000');
});

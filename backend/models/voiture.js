const db = require('../db');

const Voiture = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM voitures');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM voitures WHERE id = ?', [id]);
        return rows[0];
    },

    async getByMatricule(matricule) {
        const [rows] = await db.query('SELECT * FROM voitures WHERE matricule = ?', [matricule]);
        return rows[0];
    },

    async create(voitureData) {
        const {
            numero_chassis,
            matricule,
            photo_carte_grise,
            photo_vehicule,
            marque,
            modele,
            annee,
            couleur,
            prix_location
        } = voitureData;

        const [result] = await db.query(
            `INSERT INTO voitures 
      (numero_chassis, matricule, photo_carte_grise, photo_vehicule, marque, modele, annee, couleur, prix_location) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [numero_chassis, matricule, photo_carte_grise, photo_vehicule, marque, modele, annee, couleur, prix_location]
        );

        return { id: result.insertId, ...voitureData };
    },

    async update(id, voitureData) {
        const {
            numero_chassis,
            matricule,
            photo_carte_grise,
            photo_vehicule,
            marque,
            modele,
            annee,
            couleur,
            prix_location,
            disponible
        } = voitureData;

        await db.query(
            `UPDATE voitures SET 
      numero_chassis = ?, 
      matricule = ?, 
      photo_carte_grise = ?, 
      photo_vehicule = ?, 
      marque = ?, 
      modele = ?, 
      annee = ?, 
      couleur = ?, 
      prix_location = ?,
      disponible = ?
      WHERE id = ?`,
            [numero_chassis, matricule, photo_carte_grise, photo_vehicule, marque, modele, annee, couleur, prix_location, disponible, id]
        );

        return { id, ...voitureData };
    },

    async delete(id) {
        await db.query('DELETE FROM voitures WHERE id = ?', [id]);
        return true;
    },

    async setDisponibilite(id, disponible) {
        await db.query('UPDATE voitures SET disponible = ? WHERE id = ?', [disponible, id]);
        return true;
    }
};

module.exports = Voiture;
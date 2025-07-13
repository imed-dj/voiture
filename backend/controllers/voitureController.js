const Voiture = require('../models/Voiture');

exports.getAllVoitures = async (req, res) => {
    try {
        const voitures = await Voiture.getAll();
        res.status(200).json(voitures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVoitureById = async (req, res) => {
    try {
        const voiture = await Voiture.getById(req.params.id);
        if (!voiture) {
            return res.status(404).json({ message: 'Voiture non trouvée' });
        }
        res.status(200).json(voiture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVoitureByMatricule = async (req, res) => {
    try {
        const voiture = await Voiture.getByMatricule(req.params.matricule);
        if (!voiture) {
            return res.status(404).json({ message: 'Voiture non trouvée' });
        }
        res.status(200).json(voiture);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addVoiture = async (req, res) => {
    try {
        const newVoiture = await Voiture.create(req.body);
        res.status(201).json(newVoiture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateVoiture = async (req, res) => {
    try {
        const updatedVoiture = await Voiture.update(req.params.id, req.body);
        res.status(200).json(updatedVoiture);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteVoiture = async (req, res) => {
    try {
        await Voiture.delete(req.params.id);
        res.status(200).json({ message: 'Voiture supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.setDisponibilite = async (req, res) => {
    try {
        const { disponible } = req.body;
        await Voiture.setDisponibilite(req.params.id, disponible);
        res.status(200).json({ message: `Voiture marquée comme ${disponible ? 'disponible' : 'non disponible'}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
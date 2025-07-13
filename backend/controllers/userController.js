const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../models/userModel');

const login = (req, res) => {
    const { username, password } = req.body;

    findUserByUsername(username, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: "Utilisateur non trouvé" });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                "cle_secrete_pour_jwt", // <-- penser à utiliser process.env.JWT_SECRET plus tard
                { expiresIn: "1d" }
            );

            res.json({
                message: "Connexion réussie",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            });
        });
    });
};

module.exports = { login };

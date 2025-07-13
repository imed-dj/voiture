const db = require('../db');

const findUserByUsername = (username, callback) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]); // On retourne le premier utilisateur trouvé
    });
};

module.exports = { findUserByUsername };

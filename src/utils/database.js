import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('meatapp.db');

// Initialisation de la base de données
export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Table pour les sons favoris
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS favorites (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          soundId TEXT NOT NULL,
          title TEXT NOT NULL,
          dateAdded TEXT NOT NULL
        );`,
        [],
        () => {
          console.log('Table favorites créée avec succès');
          resolve();
        },
        (_, error) => {
          console.error('Erreur lors de la création de la table favorites:', error);
          reject(error);
        }
      );

      // Table pour l'historique des sons joués
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS sound_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          soundId TEXT NOT NULL,
          title TEXT NOT NULL,
          playedAt TEXT NOT NULL
        );`,
        [],
        () => {
          console.log('Table sound_history créée avec succès');
        },
        (_, error) => {
          console.error('Erreur lors de la création de la table sound_history:', error);
          reject(error);
        }
      );
    });
  });
};

// Ajouter un son aux favoris
export const addToFavorites = (soundId, title) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO favorites (soundId, title, dateAdded) VALUES (?, ?, ?)',
        [soundId, title, new Date().toISOString()],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
};

// Supprimer un son des favoris
export const removeFromFavorites = (soundId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM favorites WHERE soundId = ?',
        [soundId],
        (_, { rowsAffected }) => resolve(rowsAffected > 0),
        (_, error) => reject(error)
      );
    });
  });
};

// Récupérer tous les favoris
export const getFavorites = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM favorites ORDER BY dateAdded DESC',
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
};

// Vérifier si un son est en favori
export const isFavorite = (soundId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM favorites WHERE soundId = ?',
        [soundId],
        (_, { rows: { _array } }) => resolve(_array.length > 0),
        (_, error) => reject(error)
      );
    });
  });
};

// Ajouter un son à l'historique
export const addToHistory = (soundId, title) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO sound_history (soundId, title, playedAt) VALUES (?, ?, ?)',
        [soundId, title, new Date().toISOString()],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

// Récupérer l'historique
export const getHistory = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM sound_history ORDER BY playedAt DESC LIMIT 50',
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
};

// Effacer l'historique
export const clearHistory = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM sound_history',
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
}; 
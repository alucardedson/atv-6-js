const sqlite3 = require('sqlite3').verbose();

// Cria uma nova instância do banco de dados SQLite em memória
const db = new sqlite3.Database(':memory:');

// Tenta estabelecer a conexão com o banco de dados
db.serialize(() => {
  db.run("CREATE TABLE users (id INT, name TEXT)");
  db.run("INSERT INTO users VALUES (1, 'Edson')");
  db.run("INSERT INTO users VALUES (2, 'Carla')");
  
  db.each("SELECT id, name FROM users", (err, row) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
    } else {
      console.log(`ID: ${row.id}, Nome: ${row.name}`);
    }
  });
  
  // Fecha a conexão com o banco de dados
  db.close((err) => {
    if (err) {
      console.error('Erro ao fechar a conexão com o banco de dados:', err);
    } else {
      console.log('Conexão com o banco de dados fechada com sucesso!');
    }
  });
});

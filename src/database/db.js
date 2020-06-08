//importing dependencies from sqlite3
const sqlite3 = require("sqlite3").verbose() //indicando que quero ver as mensagens no terminal

//initializing object of database to make operations
const db = new sqlite3.Database("./src/database/database.db") //adding an object to the const

module.exports = db //exporting the db object

//utilizando o objeto de banco de dados para operações
// db.serialize(() => {
//   //CRIAR uma tabela no database com comandos sql
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT, 
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//       );
//   `)

//   //INSERIR dados na tabela com sql 
//   //Campos da tabela na const query
//   const query = `
//     INSERT INTO places (
//       image, 
//       name,
//       address,
//       address2,
//       state,
//       city,
//       items
//     ) VALUES (?, ?, ?, ?, ?, ?, ?);
//   `

//   //Values from the schedule on const values
//   const values = [
//     "url with the photo",
//     "Papersider",
//     "John Fisher, Pocitos",
//     "Número 000",
//     "Montevideo",
//     "Montevideo",
//     "Papel y Cartolina"
//   ]

//   function afterInsertData(err){ //Após inserir o dados no banco de dados executo a função de  callback
//       if(err) { //tratamento de erros
//         return console.log(err)
//       }
  
//       console.log("Cadastrado com sucesso")
//       console.log(this)
//   }

//   db.run(query, values, afterInsertData) //passando a função afterInsertData por referencia

  
//   //CONSULTAR o dados da tabela
//   // db.all(`SELECT * FROM places`, function (err, rows) { //rows são os registros da tabela 
//   //   if(err) { //tratamento de erros
//   //     return console.log(err)
//   //   }

//   //   console.log("Aqui estão seus registros")
//   //   console.log(rows)
//   // })

  //DELETAR dados da tabela
//   db.run(`DELETE FROM places WHERE id = ?`, [3], function (err) {
//     if(err) { //tratamento de erros
//       return console.log(err)
//     }

//     console.log("Registro deletado com sucesso")
//   })
  
// })

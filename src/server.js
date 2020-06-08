const express = require("express") //importing express
const server = express() //executing express on server

const db = require("./database/db") //importing data base

// configuring public folder who has the CSS
server.use(express.static("public"))

//habilitando el uso del req.body on express
server.use(express.urlencoded({ extended: true }))

//template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", { //configuring nunjucks
  express: server,
  noCache: true
})

//configuring routes
// inicial page
server.get("/", (req, res) => {
  return res.render("index.html", { title: "Um titulo" }) //rendering the index.html page using nunjucks
})

// create a collection point
server.get("/create-point", (req, res) => {
  //getting data from frontend using the url
  req.query
  
  return res.render("create-point.html")
})

//Getting data from the signUp form of the collecting point and inserting on database
server.post("/savepoint", (req, res) => {
  //INSERT dados na tabela com sql 
  //Campos da tabela na const query  
  const query = `
    INSERT INTO places (
      image, 
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `

  //Values from the schedule on const values
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err){ //Após inserir o dados no banco de dados executo a função de  callback
      if(err) { //tratamento de erros
        console.log(err)
        res.send("Erro no cadastro")
      }
  
      console.log("Cadastrado com sucesso")
      console.log(this)
      return res.render("create-point.html", { saved: true })
  }

  db.run(query, values, afterInsertData) //passando a função afterInsertData por referencia

})

// search results
server.get("/search", (req, res) => {

// searching for collect point in the city using the search bar
const search = req.query.search

if (search == "" ){// if it's empty
  return res.render("search-results.html", { total:0 })//renderiza o html sem mostrar nenhum dado do database
}


//CONSULT na tabela se tem dados cadastrados com a cidade pesquisada
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) { //rows são os registros da tabela 
    if(err) { //tratamento de erros
      return console.log(err)
    }

    const total = rows.length //saving number of cars on DataBase

    //Rendering html with db data
    return res.render("search-results.html", { places:rows, total: total })
  })
})


// initializing server on port:
server.listen(3000)
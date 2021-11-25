const serverRoutes = require("./routes/routes");
const express = require('express');
const cors = require("cors")
const morgan = require('morgan');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors('*'));

app.use(morgan('dev'));

app.set("view engine", "ejs");
app.set("views", "./public");

app.get("/", (req, res) =>{
    res.send("Desde la raiz del server");
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando en la URL http://localhost:${PORT}/api/tasks`);
})

serverRoutes(app);

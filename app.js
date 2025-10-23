const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public"))); //para cargar index como pagina estatic

app.set("view engine", "ejs"); 

app.use(express.urlencoded({ extended: true })); //codifican de los datos del formulario
app.get("/form", (req, res) => {
  res.render("form", {
    name: "",
    email:"",
    options: "",
    type: [],
    message: " ",
  });
});

app.post("/form", (req, res) => {
  console.log(req.body);
  const { name, email, options, message } = req.body;
  let type = req.body.type || [];

  if(!Array.isArray(type)) {type = [type];}

  let errores = [];

  if (!name || name.trim().length < 3) {
    errores.push("El nombre es obligatorio y debe tener al menos 3 caracteres.");
  }

  if(!message || message.trim().length < 10) {
    errores.push("El mensaje es obligatorio y debe tener al menos 10 caracteres.");
  }

  res.send(JSON.stringify(errores));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
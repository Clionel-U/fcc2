require('dotenv').config();
const express = require('express');
const app = express();

console.log("Hello World");

app.use((req,res,next)=>{
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.get('/', (req, res)=>{
  res.sendFile(__dirname+"/views/index.html")
})
app.use("/public", express.static(__dirname + "/public"))

app.get('/json', (req, res)=>{
  let msg = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase'){
    msg = msg.toUpperCase();
  }
  const data = {"message": msg};
  res.json(data);
})
console.log(process.env.MESSAGE_STYLE)

app.get('/now', (req, res, next)=>{
  req.time = new Date().toString();
  next();
},
 (req, res)=>{
   res.json({time: req.time})
 }       
)

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});


module.exports = app;

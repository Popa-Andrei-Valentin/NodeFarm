const fs = require("fs");
const http = require ("http");

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) =>{
 const pathName = req.url;

 // Overview Page
 if (pathName === "/" || pathName === "overview") {
  res.writeHead(200, {'Content-type':'application/json'});
  res.end(templateOverview);

  // Product Page
 } else if (pathName === "/product") {
  res.end("This is the product")

  // API 
 } else if (pathName === "/api") {
  res.writeHead(200, {'Content-type':'application/json'});
  res.end(data);

  // NOT FOUND
 } else {
  res.writeHead(404,{
   "Content-type": "text/html",
   "my-own-header": "hello-world"
  })
 }
})

server.listen(8000, '127.0.0.1', () => {
 console.log('Listening to requests on port 8000');
});
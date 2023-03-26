const fs = require("fs");
const http = require ("http");
const url = require("url");

const replaceTemplate = (template, product) => {
 let output = template.replace(/{%PRODUCT_NAME%}/g, product.productName);
 output = output.replace(/{%IMAGE%}/g, product.image)
 output = output.replace(/{%PRICE%}/g, product.price)
 output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients)
 output = output.replace(/{%QUANTITY%}/g, product.quantity)
 output = output.replace(/{%DESCRIPTION%}/g, product.description)
 output = output.replace(/{%ID%}/g, product.id)
 output = output.replace(/{%FROM%}/g, product.from);

 if(!product.organic) {
  output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic")
 }

 return output;
}

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) =>{
 console.log(req.url);
 const {query, pathname} = url.parse(req.url, true);
 // const pathname = req.url;

 // Overview Page
 if (pathname === "/" || pathname === "/overview") {
  res.writeHead(200, {'Content-type':'text/html'});

  const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('')
  const output = templateOverview.replace("{%PRODUCT_CARDS%}",cardsHtml)

  res.end(output);
  return
  // Product Pagef
 } else if (pathname === "/product") {
  res.writeHead(200, {'Content-type':'text/html'});
  
  const product = dataObj[query.id]
  const output = replaceTemplate(templateProduct, product)
  // console.log("output", output);
  res.end(output)

  return
  // API 
 } else if (pathname === "/api") {
  res.writeHead(200, {'Content-type':'application/json'});
  res.end(data);
  return
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
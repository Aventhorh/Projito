const jsonServer = require('json-server');
const path = require('path');

const STORAGE_PATH = path.join(__dirname, './db.json');
const PORT = 3001;

const server = jsonServer.create();
const router = jsonServer.router(STORAGE_PATH);

server.use(jsonServer.defaults());
server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running at port: ${PORT}`);
})

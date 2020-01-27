const express = require('express');

const server = express();

server.use(express.json());

const projects = [];


//Middlewares:
function checkIdExists(req, res, next) {
  const { id } = req.params;
  const index = projects.findIndex(item => item.id == id);

  if (index < 0) {
    return res.status(400).json({ error: 'ID does not exists' });
  }

  req.index = index;

  return next();
}
server.use((req, res, next) => {
  next();

  console.count("Número de requisições realizadas");
});


// Rotas:
server.post('/projects', (req, res) => {
  const project = req.body;

  projects.push(project);

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { title } = req.body;

  const index = req.index;

  projects[index].tasks.push(title);

  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', checkIdExists, (req, res) => {
  const project = req.body;
  const index = req.index;

  projects[index] = project;
  
  return res.json(projects);
});

server.delete('/projects/:id', checkIdExists, (req,res) => {
  const index = req.index;

  projects.splice(index, 1);

  return res.send();
});


server.listen(3000);
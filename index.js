const express = require('express');

const server = express();

server.use(express.json());

const projects = [
  {
    id: 1,
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];

var requests = 0;


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
  requests++;

  next();

  console.log(`Número de requisições realizadas: ${requests}`);
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

  const tasks = projects[index].tasks;
  tasks.push(title);

  projects[index].tasks = tasks;

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

  return res.json(projects);
});


server.listen(3000);
const express = require('express');

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  }
];



// Rotas:
server.post('/projects', (req, res) => {
  const project = req.body;

  projects.push(project);

  return res.json(projects);
});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const index = projects.findIndex(item => item.id == id);

  const tasks = projects[index].tasks;
  tasks.push(title);

  projects[index].tasks = tasks;

  return res.json(projects);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const project = req.body;

  const index = projects.findIndex(item => item.id == id);

  projects[index] = project;
  
  return res.json(projects);
});

server.delete('/projects/:id', (req,res) => {
  const { id } = req.params;

  const index = projects.findIndex(item => item.id == id);

  projects.splice(index, 1);

  return res.json(projects);
});


server.listen(3000);
const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;
    const repositorie = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0
    };
    repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;

    const { title, url, techs } = request.body;

    const repositorieId = repositories.findIndex(repositorie => repositorie.id === id);

    if(!(repositorieId < 0)){
       const tempRepo =  repositories[repositorieId];
       repositories[repositorieId] = { ...tempRepo, title, url, techs };

      return response.json({message: 'Atualizado!'});
    }else{

      return response.status(400).json({message: 'Nao existe o id informado!'});
    }
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const repositorieId = repositories.findIndex(repositorie => repositorie.id === id);
    if(repositorieId < 0){
      return response.status(400).json({message: 'Nao existe o id informado!'});
    }
      repositories.splice(repositorieId, 1);
      return response.status(204).json({});
    
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;
    const repositorieId = repositories.findIndex(repositorie => repositorie.id === id);
    
    if(repositorieId < 0){
      return response.status(400).json({message: 'Nao existe o id informado!'});
    }

    const tempRepo =  repositories[repositorieId];
    let { likes } = tempRepo;
    likes++;
    repositories[repositorieId] = { ...tempRepo, likes };

    return response.json({message: 'like!'});
});

module.exports = app;

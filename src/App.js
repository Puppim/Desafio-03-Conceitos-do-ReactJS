import React, { useState, useEffect} from "react";
import api from './services/api'
 

import "./styles.css";

function App() {

  const [repositories, setRepositories] =  useState([]);

  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    });
  },[]);


  async function handleAddRepository() {

    const title = document.querySelector('#titleText_id').value;
    const owner = document.querySelector('#ownerText_id').value;
    const teste = { techs: ["Node.js","vuejs"]}

    const response = await api.post('repositories',{title:title, owner: owner, teste})
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
   
    await api.delete(`repositories/${id}`);
    // api.get('repositories').then(response=>{
    //   setRepositories(response.data);
    // });
  
    const repositoryId = repositories.findIndex(repository => repository.id === id);


    let title = document.querySelector('#titleText_id');
    if(repositoryId>=0){
    //  title.value = repositoryId.toString();
      const temp = repositories;
      temp.splice(repositoryId,1);
      setRepositories([...temp]);
    }else{
      title.value= "nada"
    }
      
  }

  return (
    <div>
      <ul data-testid="repository-list">
      { repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>



        )}
       
      </ul>
      <br/>
      <input type="text" name="title" id="titleText_id" placeholder="title"/><br/><br/>
      <input type="text" name="owner" id="ownerText_id"placeholder="owner"/><br/>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

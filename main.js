


//get localstore - função


const creatTemp = {
    nome: "ana",
    email: "ana@gmail.com",
    telefone: "19 995681352",
    cidade: "Paulinia"
}

const getLocalStore = () => JSON.parse(localStorage.getItem("dbClient")) ?? [];

//set LocalStore -função
const setLocalStore = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient)); 

//CRUD - ADCIONAR
const creatClient = (client) => {
    const dbClient = getLocalStore();
    dbClient.push(client);
    setLocalStore(dbClient)
}


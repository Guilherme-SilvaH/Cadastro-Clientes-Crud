const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => document.getElementById('modal').classList.remove('active')


const creatTemp = {
    nome: "ana",
    email: "ana@gmail.com",
    telefone: "19 995681352",
    cidade: "Paulinia"
}


//get localstore - função
const getLocalStore = () => JSON.parse(localStorage.getItem("dbClient")) ?? [];



//set LocalStore -função
const setLocalStore = (dbClient) => localStorage.setItem("dbClient", JSON.stringify(dbClient)); 

//CRUD *Create *Read *Update *Delete

//- ADCIONAR
const creatClient = (client) => {
    const dbClient = getLocalStore();
    dbClient.push(client);
    setLocalStore(dbClient)
}

//Read
const readClient = () => getLocalStore();


//Update
const updateClient = (index, client) =>{
    const dbClient = readClient();
    dbClient[index] = client
    setLocalStore(dbClient)
}

//delete
const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1);
    setLocalStore(dbClient)
}



//evento

document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('modalClose').addEventListener('click', closeModal)
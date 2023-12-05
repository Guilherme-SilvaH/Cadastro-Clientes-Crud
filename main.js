const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () =>  {
    clearCampos()
    document.getElementById('modal').classList.remove('active')
}



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

const camposvalidos = () =>{
    return document.getElementById('form').reportValidity()
}

const clearCampos = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

const saveclient = () => {
    if(camposvalidos()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        creatClient(client)
        closeModal()
    }
}


//evento
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', saveclient)
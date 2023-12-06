'use strict'

const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () =>  {
    clearCampos()
    document.getElementById('modal').classList.remove('active')
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
    document.getElementById('nome').dataset.index = 'new'
    document.querySelector(".modal-header>h2").textContent  = 'Novo Cliente'
}

const saveclient = () => {
    if(camposvalidos()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }

        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            creatClient(client)
            updatetable()
            closeModal()
        }else{
            updateClient(index, client)
            updatetable(),
            closeModal()
        }
    
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr') //criar uma nova linha no HTML no tbody 
    newRow.innerHTML = ` 
        <td>${client.nome}</td>
        <td>${client.email} </td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>

        <td>
            <button type= "button" class= "button green" id='editar-${index}'>Editar</button>
            <button type= "button" class= "button red" id='excluir-${index}'>Excluir</button>
        </td>
    `//criando um html (TR) com os dados do localstore(client), aqui estamo deixando apenas na "memoria"

    document.querySelector('#tableClient>tbody').appendChild(newRow)//aqui vamos mandar para o DOM(HTML)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')//pega cada linha do tbody (tr) e guarda em uma variavel
    rows.forEach(row => row.parentNode.removeChild(row))//remove a linha 
}

const updatetable = () => {
    const dbClient = readClient()
    clearTable()
    dbClient.forEach(createRow)
}


const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index
}

const editclient = (index) => {
    const client = readClient()[index];
    client.index = index
    fillFields(client)
    document.querySelector(".modal-header>h2").textContent  = `Editando ${client.nome}`
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button'){
        const [action , index] = event.target.id.split('-')
        if (action == 'editar') {
            editclient(index)
        }else{
            const client = readClient()[index]
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}`)
            if (response) {
                deleteClient(index)
                updatetable()
            }
        }
    }
}


updatetable()

//evento
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('salvar').addEventListener('click', saveclient)
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)
document.getElementById('cancelar').addEventListener('click', closeModal)
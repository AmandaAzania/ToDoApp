
let lists = JSON.parse(localStorage.getItem('items')) ? 
JSON.parse( localStorage.getItem('items')) : [
    {
        id: 1,
        item: 'submit my work',
        createdDate: new Date()
    }
];
//
document.addEventListener("DOMContentLoaded", ()=> {
    readItems();
});

const nameInput = document.querySelector('#name');
const newTodoForm = document.querySelector('#new-todo-form');

const username = localStorage.getItem('username') || '';

nameInput.value = username;

nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
})

function addItems() {
    try{
        let list = document.getElementById('list-content').value;
        // Fetch the last index of id
        let index = lists.length + 1;
        // Add a new item
        lists.push(
            {
                id: index !== undefined ? index : 1 , 
                item: list,
                createdDate: new Date()
            }
        );
     
        localStorage.setItem('items', JSON.stringify(lists));    
    }catch(e) {
        console.log(e.message);
    }
    readItems();
}

function readItems() {
    let contents = document.querySelector('#item-wrapper');
    contents.innerHTML = "";
    lists.forEach( (item, index)=> {
        contents.innerHTML += 
        `
        <li class="bg-gradient list-unstyled" id="${index}">
        <input type="checkbox" onclick="itemCompleted(${index})" class="chkItem form-check-input">
        <span class="list-content">${item.item}</span>
        <i class="bi bi-x-octagon-fill list-icon" onclick="removeItem(${index})" id="${index}"></i>
        </li>
        `;
    } );
}
const btnAddItem = document.querySelector('#addItem');
btnAddItem.addEventListener('click', addItems);

function itemCompleted(id) {
    if(document.querySelectorAll('.chkItem')[id].checked) {
        document.querySelectorAll('.list-content')[id].classList.add('addLine');
    }else {
        document.querySelectorAll('.list-content')[id].classList.remove('addLine');
    }
}

document.querySelector('#sorting').addEventListener('click', ()=> {
    lists.sort( (a, b)=> {
        return (a.item < b.item) ? -1: 0; 
    });
 
    localStorage.setItem('items', JSON.stringify(lists));   
    readItems(); 
});

function removeItem(id) {
    if(id > -1) {
        lists.splice(id, 1); 
        
        localStorage.setItem('items', JSON.stringify(lists));        
    }
    readItems();
}
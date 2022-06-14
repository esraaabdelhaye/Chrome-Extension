// Variables 
const saveBtn = document.querySelector('.save-btn');
const inputURL = document.querySelector('.input-el');
const inputName = document.querySelector('.input-name')
const showURL = document.querySelector(".show-items");
const SaveTab = document.querySelector('.getTab');
const deleteBtn = document.querySelector('.delete')
let myLeads =JSON.parse(localStorage.getItem('infoArray')) || [];
let deleteItemBtns 



// Event Listeners 
saveBtn.addEventListener('click' , save);
SaveTab.addEventListener('click' , getCurrentTab)
deleteBtn.addEventListener('click' , deleteData)




// Functions 
render()                 // to Show The Saved Book Marks

// sending the data to the render function
function save(){
    const inputData = inputURL.value;
    render(inputData)
}

// rendering the items on screen after recieving data
function render(inputData){
    const name = inputName.value;

    inputURL.value = '';
    inputName.value = '';
    if(inputData && name){                     // making sure that the url and name input aren't empty
        myLeads.push({url:inputData , name:name});
        localStorage.setItem('infoArray' , JSON.stringify(myLeads));
    }
    const Content = myLeads.map(element=> `
    <li id=${myLeads.indexOf(element)}>
        <a href="${element.url}" target="_blank">${element.name}</a>
        <i class="fa-solid fa-x"></i>
    </li>
    <div class="line-break"></div>
    `).join('')
    showURL.innerHTML= Content;

    // checking that the render function isn't called by the delete function 
    if(myLeads.length!==0){
        deleteItemBtns =  document.querySelectorAll('i.fa-solid');
        deleteItemBtns.forEach(element => element.addEventListener('click' , deleteItem))
    }
}

// getting the current tab url and sending it to the render function
function getCurrentTab(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        render(tabs[0].url)
     });
}

// deleting all the items
function deleteData () {
    localStorage.clear();
    myLeads = []
    showURL.textContent='';
}

// deleting one specific item
function deleteItem(e){;
    elementIndex = e.target.parentNode.id;
    console.log(elementIndex);
    myLeads.splice(elementIndex , 1);
    localStorage.setItem('infoArray' , JSON.stringify(myLeads));
    render();
}

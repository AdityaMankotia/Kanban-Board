//show/hide property on plus button click

const addBtn=document.querySelector('.add-btn');
const modalCont= document.querySelector('.modal-cont');
const textAreaCont= document.querySelector('.textArea-cont');

const removeBtn = document.querySelector('.remove-btn');

let addTaskFlag= false; //on page load initially, popup should not br visible

let removeTaskFlag=false;

const ticketArr = JSON.parse(localStorage.getItem('tickets')) || [];

addBtn.addEventListener('click',function(){
    addTaskFlag = !addTaskFlag; //toggle variable value
    // if(addTaskFlag){
    //     addTaskFlag=false
    // }
    // else{
    //     addTaskFlag=true
    // }
    if(addTaskFlag){
        modalCont.style.display='flex'
    }else{
        modalCont.style.display='none'
    }
})

//remove tickets...
removeBtn.addEventListener('click', function(){
    removeTaskFlag =! removeTaskFlag; //toggle the value

    const allTickets=document.querySelectorAll('.ticket-cont')

    for(let i=0;i<allTickets.length;i++){
        handleTicketRemoval(allTickets[i])
    }

    if(removeTaskFlag){
        alert('Delete button has been activated.');
        removeBtn.style.color ='red';
    }else{
        removeBtn.style.color='white';
    }
})



function handleTicketRemoval(ticketElem){
    const id=ticketElem.querySelector('.ticket-id').innerText;
    ticketElem.addEventListener('click',function(){
        if(removeTaskFlag === true){
            ticketElem.remove();
            const ticketIdx=getTicketIndex(id);
            //array.splice - delete/adding a particular idx
            ticketArr.splice(ticketIdx,1);
            updateLocalStorage();
        }else{
            console.log('in else condition');
            
        }
    })

}

//create a ticket dynamically
function createTicket(ticketColor, ticketTask, ticketID){
    //create a new ticket HTML (container element)
    const ticketCont= document.createElement('div');
    ticketCont.classList.add('ticket-cont');
    ticketCont.innerHTML = `
    <div class="ticket-color" style="background-color: ${ticketColor}"></div>
            <div class="ticket-id">${ticketID}</div>
            <div class="ticket-area">${ticketTask}</div>
            <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
                <!-- <i class="fa-solid fa-lock-open"></i> -->
            </div>
    `;
    const mainCont=document.querySelector('.main-cont');
    mainCont.appendChild(ticketCont);
    handleLock(ticketCont)
    handleColor(ticketCont)

    
    // ticketArr.push({
    //     ticketID:ticketID,
    //     ticketColor:ticketColor,
    //     ticketCont:ticketTask

    // })
    // localStorage.setItem('tickets',JSON.stringify(ticketArr))
}

let modalPriorityColor ='black';

modalCont.addEventListener('keydown', function(ev){
    if(ev.ctrlKey && ev.key==='Shift'){
        const ticketTaskValue=textAreaCont.value;
        //Generate random ID.
        const ticketID = Math.random().toString(36).substring(2, 9);
        //const ticketID= shortid();
        createTicket(modalPriorityColor,ticketTaskValue, ticketID);//pass my color, ticket description
        modalCont.style.display='none'; //hide the model
        textAreaCont.value=''; //clear contents on close
        ticketArr.push({
                ticketID:ticketID,
                ticketColor:modalPriorityColor,
                taskContent:ticketTaskValue
        
            });
            updateLocalStorage();
    };
    
})

//selecting priority colors
const allPriorityColors = document.querySelectorAll('.priority-color');

allPriorityColors.forEach(function(colorElem){
    colorElem.addEventListener('click', function(){
        //on each color remove active class
        allPriorityColors.forEach(function(priorityColorElem){
            priorityColorElem.classList.remove('active')
        })

        //on clicked element, add the class
        colorElem.classList.add('active');
        modalPriorityColor = colorElem.getAttribute('data-color');
    })
    
    //implementing additional logic to apply the active color to the task as well.
})

//lock functionality

const lockClosedClass= 'fa-lock'
const lockOpenClass= 'fa-lock-open'

function handleLock(ticketElem){
    const ticketLockElem = ticketElem.querySelector('.ticket-lock');
    const ticketTaskArea=ticketElem.querySelector('.ticket-area')

    const id=ticketElem.querySelector('.ticket-id').innerText;

    ticketLockElem.addEventListener('click',function(){

        const ticketIdx=getTicketIndex(id);

        if(ticketLockElem.children[0].classList.contains(lockClosedClass)){
            //1. remove lock close class
            ticketLockElem.children[0].classList.remove(lockClosedClass)
            //2. add lock open class
            ticketLockElem.children[0].classList.add(lockOpenClass)
            //3. now should be able to edit
            ticketTaskArea.setAttribute('contenteditable', "true") // allow html element to be edited.
        }else{
            ticketLockElem.children[0].classList.remove(lockOpenClass)
            ticketLockElem.children[0].classList.add(lockClosedClass)
            ticketTaskArea.setAttribute('contenteditable', "false") 
        } 
        ticketArr[ticketIdx].taskContent = ticketTaskArea.innerText;
        updateLocalStorage();
    })
}

const colors=['red','yellow','green','darkgreen']

function handleColor(ticketElem){
    const ticketColorBand=ticketElem.querySelector('.ticket-color');
    const id=ticketElem.querySelector('.ticket-id').innerText;
    ticketColorBand.addEventListener('click',function(){
        //get current color of ticket
        const currentColor=ticketColorBand.style.backgroundColor;
        const ticketIdx=getTicketIndex(id);
        //get index of that color in the color array
        //findIndex method
        const currentColorIndex= colors.findIndex(function(color){
            return color === currentColor
            
        })
        // increment index & using modulus operator to avoid OVERFLOW.
        const newColorIndex=(currentColorIndex + 1)%colors.length
        const newTicketColor=colors[newColorIndex]
        ticketColorBand.style.backgroundColor=newTicketColor
        ticketArr[ticketIdx].ticketColor=newTicketColor
        updateLocalStorage();
    })
}

const toolBoxColors=document.querySelectorAll('.color')

toolBoxColors.forEach(function(colorElem){
    colorElem.addEventListener('click', function(){
        const selectedColor = colorElem.classList[0]
        const allTickets=document.querySelectorAll('.ticket-cont')
        
        allTickets.forEach(function(ticketElem){
            const ticketColorBand = ticketElem.querySelector('.ticket-color');
            const currentColor=ticketColorBand.style.backgroundColor;
            
            if(currentColor === selectedColor){
                ticketElem.style.display='block'
            }else{
                ticketElem.style.display='none'
            }  
        })
    })
    colorElem.addEventListener('dblclick',function(){
        const allTickets=document.querySelectorAll('.ticket-cont')
        allTickets.forEach(function(ticketElem){
                ticketElem.style.display='block'
        })
    })
})

function updateLocalStorage(){
    //simpley to update LS
    localStorage.setItem('tickets', JSON.stringify(ticketArr))
}

function initialise(){
    //first step is to retrieve all tickets stored in LS
    if(localStorage.getItem('tickets')){
        for(let i=0;i<ticketArr.length;i++){
            createTicket(ticketArr[i].ticketColor, ticketArr[i].taskContent,ticketArr[i].ticketID)
        }
    }
}

initialise()

function getTicketIndex(id){
    //find the ticket obj index from Local Storage
    //that is the ticket that needs to be updated
    let ticketIdx=ticketArr.findIndex(function(ticketObj){
        return ticketObj.ticketID===id;
    })
    return ticketIdx;
}
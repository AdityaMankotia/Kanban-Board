//show/hide property on plus button click

const addBtn=document.querySelector('.add-btn');
const modalCont= document.querySelector('.modal-cont');
const textAreaCont= document.querySelector('.textArea-cont');

const removeBtn = document.querySelector('.remove-btn');

let addTaskFlag= false; //on page load initially, popup should not br visible

let removeTaskFlag=false;

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
    ticketElem.addEventListener('click',function(){
        if(removeTaskFlag === true){
            ticketElem.remove();
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
}

let modalPriorityColor ='black';

modalCont.addEventListener('keydown', function(ev){
    if(ev.key=='Shift'){
        const ticketTaskValue=textAreaCont.value;
        //Generate random ID.
        const ticketID= shortid();
        createTicket(modalPriorityColor,ticketTaskValue, ticketID);//pass my color, ticket description
        modalCont.style.display='none'; //hide the model
        textAreaCont.value=''; //clear contents on close
        
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
    const ticketLockElem=document.querySelector('.ticket-lock')
    const ticketTaskArea=ticketElem.querySelector('.ticket-area')

    ticketLockElem.addEventListener('click',function(){

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
    })
}




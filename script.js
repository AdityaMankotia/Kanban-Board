//show/hide property on plus button click

const addBtn=document.querySelector('.add-btn');
const modalCont= document.querySelector('.modal-cont');

let addTaskFlag= false; //on page load initially, popup should not br visible

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
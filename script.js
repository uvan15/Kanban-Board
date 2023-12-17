let addBtn=document.querySelector('.add-btn')
let removeBtn=document.querySelector('.remove-btn')
let modal=document.querySelector('.modal')
let main_cont=document.querySelector('.main-cont')
let taskAreaText=document.querySelector('.text-area')
let pallette=document.querySelectorAll('.pallette')
let ticketColor='black'
let ticketArr=[]




//local storage

if(localStorage.getItem('tickets')){
    ticketArr=JSON.parse(localStorage.getItem('tickets'))
    ticketArr.forEach(function(ticket){
        createTicket(ticket.ticketColor,ticket.textAreaValue,ticket.ticketID)
    })
}
//active color pallette

pallette.forEach(function(activeColor){
    activeColor.addEventListener('click',function(allColor){
        pallette.forEach(function(allColor){
            allColor.classList.remove('active')
        })
        activeColor.classList.add('active')
        ticketColor=activeColor.classList[0]
        //console.log(ticketColor)
    })
})



//Filter


let filterColor=document.querySelectorAll('.color')
for(let i=0;i<filterColor.length;i++){
    filterColor[i].addEventListener('click',function(){
        currentFilterColor=filterColor[i].classList[0]
        let filteredTickets=ticketArr.filter(function(ticket){
            return currentFilterColor===ticket.ticketColor
        })
        // console.log(filteredTicket)
        let allTickets=document.querySelectorAll('.ticket')
        for(let i=0;i<allTickets.length;i++){
            allTickets[i].remove()
        }
        filteredTickets.forEach(function(filteredTicket){
            createTicket(filteredTicket.ticketColor,filteredTicket.textAreaValue,filteredTicket.ticketID)
        })
    })


    filterColor[i].addEventListener('dblclick',function(){
        //console.log('dblclick invoked')
        let allTickets=document.querySelectorAll('.ticket');
        for(let i=0;i<allTickets.length;i++){
            allTickets[i].remove();
        }
        ticketArr.forEach(function(Eachticket){
            createTicket(Eachticket.ticketColor,Eachticket.textAreaValue,Eachticket.ticketID)
        })

    })
}

//addbtn
let addFlag=false;
addBtn.addEventListener('click',function(e){
    try {
        addFlag=!addFlag
        if(addFlag==true){
            modal.style.display='flex'
        }
        else{
            modal.style.display='none'
        } 
    } catch (error) {
        console.log(error)
    }
})

//removeBtn

let removeFlag=false
removeBtn.addEventListener('click',function(e){
    try {
        removeFlag=!removeFlag
        if(removeFlag==true){
            removeBtn.style.color='red'
            window.alert('Delete button has been activated')
        }
        else{
            removeBtn.style.color='inherit'
        }
    } catch (error) {
        console.log(error)
    }
})

//ticket generating



modal.addEventListener('keydown',function(e){
    try {
        let shiftIn=e.shiftKey
    //console.log(shiftIn)
    if(shiftIn){
        createTicket(ticketColor,taskAreaText.value)
        modal.style.display='none'
        taskAreaText.value=''
    }
    } catch (error) {
        console.log(error)
    }
    
})

//create ticket
function createTicket(ticket_Color,textAreaValue,ticketID){
    let id=ticketID || shortid()
    let ticketCon=document.createElement('div')
    ticketCon.setAttribute('class','ticket')
    ticketCon.innerHTML=`<div class="${ticket_Color} ticket-color"></div>
    <div class="ticket-id">${id}</div>
    <div class="ticket-task">${textAreaValue}</div>
    <div class="ticket-lock"><i class="fa-solid fa-lock"></i></div> `
    main_cont.appendChild(ticketCon)

    
    if(!ticketID){
        ticketArr.push({ticketColor,textAreaValue,ticketID:id})
        localStorage.setItem('tickets',JSON.stringify(ticketArr))
    }
    
    //console.log(ticketArr)

    removeTicket(ticketCon,id)

    handleLock(ticketCon,id)

    priorityColor(ticketCon,id)
}

function removeTicket(ticket,id){
    ticket.addEventListener('click' ,function(){
        if(!removeFlag) return

        else{
            let idx = getTicketInx(id)
 
          ticket.remove() // ui removal
 
          let deletedElement = ticketArr.splice(idx , 1)
        //   console.log(deletedElement)
        }
          
 
 
          localStorage.setItem('tickets' , JSON.stringify(ticketArr))
        
    })
    
}

//locking option

// let ticketLocCont=document.querySelector('.ticketLockOpen')
// console.log(ticketLocCont)
// let ticketLocked=document.querySelector('.ticket-lock')
// let ticketOpen=document.querySelector('.ticket-open')
// let ticketflag=false
// ticketLocCont.addEventListener('click',function(){
//     ticketflag=!ticketflag
//     if(ticketflag==true){
//         ticketOpen.style.display='flex'
//         ticketLocked.style.display='none'
//     }
//     else{
//         ticketOpen.style.display='none'
//         ticketLocked.style.display='flex'
//     }
// })

let lockClass='fa-lock'
let unlockClass='fa-lock-open'
// let lockFlag=false

function handleLock(ticket,id){
    let ticketLockCont=ticket.querySelector('.ticket-lock')
    let ticketTask=ticket.querySelector('.ticket-task')
    let ticketLockOpen=ticketLockCont.children[0]
    ticketLockOpen.addEventListener('click',function(){
        // lockFlag=!lockFlag
        // console.log(lockFlag)
        let ticketIdx=getTicketInx(id)
        if(ticketLockOpen.classList.contains(lockClass)){
            ticketLockOpen.classList.remove(lockClass)
            ticketLockOpen.classList.add(unlockClass)
            ticketTask.setAttribute('contenteditable','true')
            // console.log(ticketLockOpen)
            // console.log(ticketLockOpen.classList[1])
        }
        else{
            ticketLockOpen.classList.remove(unlockClass)
            ticketLockOpen.classList.add(lockClass)
            ticketTask.setAttribute('contenteditable','false')
            // ticketLockOpen.classList[1].replace(lockClass)
            // console.log(ticketLockOpen)
            // console.log(ticketLockOpen.classList[1])
        }


        ticketArr[ticketIdx].textAreaValue=ticketTask.innerText
        localStorage.setItem('tickets',JSON.stringify(ticketArr))
    })
}
//priority color change
let color=['lightpink','light']
function priorityColor(ticket,id){
    let priorcolor=ticket.querySelector('.ticket-color')
    priorcolor.addEventListener('click',function(){
        let ticketIdx=getTicketInx(id)
        let currentColor='black'
        if(priorcolor.classList.contains('lightpink')){
            currentColor='lightpink'
        }
        
        if(priorcolor.classList.contains('lightgreen')){
            currentColor='lightgreen'
        }

        if(priorcolor.classList.contains('lightblue')){
            currentColor='lightblue'
        }

        if(priorcolor.classList.contains('black')){
            currentColor='black'
        }

        let newIdxColor='black'
        if(currentColor=='lightpink'){
            newIdxColor='lightgreen'
            priorcolor.classList.remove(currentColor)
            priorcolor.classList.add('lightgreen')
        }
        else if(currentColor=='lightgreen'){
            newIdxColor='lightblue'
            priorcolor.classList.remove(currentColor)
            priorcolor.classList.add('lightblue')
        }
        else if(currentColor=='lightblue'){
            newIdxColor='black'
            priorcolor.classList.remove(currentColor)
            priorcolor.classList.add('black')
        }
        else if(currentColor=='black'){
            newIdxColor='lightpink'
            priorcolor.classList.remove(currentColor)
            priorcolor.classList.add('lightpink')
        }
    // console.log(currentColor)

    ticketArr[ticketIdx].ticketColor=newIdxColor
    localStorage.setItem('tickets',JSON.stringify(ticketArr))
    })
}


//findIndx

function getTicketInx(id){
    let ticketIdx=ticketArr.findIndex(function(ticket){
        return ticket.ticketID===id
    })
    return ticketIdx
}

//info
let infoButton = document.querySelector('.info')
let information = document.querySelector('.info-abt-web')
let infoButtonFlag=false
infoButton.addEventListener('click',function(){
    infoButtonFlag=!infoButtonFlag
    if(infoButtonFlag){
        information.style.display='flex'
    }
    else{
        information.style.display='none'
    }
})

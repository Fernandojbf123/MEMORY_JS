

const dButtonStart = document.getElementById("buttonstart")
const dScore       = document.getElementById("score");

let seconds = 0;
let minutes = 0;
let hours   = 0;
let isTimerRunning = false

let selections = []
let points = 20; //score
dScore.innerText = `Score: ${points}`;

dButtonStart.addEventListener("click", e => handleStart())

const icons = [
    '<i class="fa-solid fa-heart"></i>',
    '<i class="fa-regular fa-heart"></i>',
    '<i class="fa-solid fa-diamond"></i>',
    '<i class="fa-solid fa-person-walking"></i>',
    '<i class="fa-solid fa-person-hiking"></i>',
    '<i class="fa-solid fa-motorcycle"></i>',
    '<i class="fa-solid fa-anchor"></i>',
    '<i class="fa-solid fa-restroom"></i>',
    '<i class="fa-solid fa-poo"></i>',
    '<i class="fa-solid fa-moon"></i>',
    '<i class="fa-solid fa-rocket"></i>',
    '<i class="fa-solid fa-shuttle-space"></i>',
]

/* FUNCTIONS */    

function handleStart () {

    let dPair = document.getElementById("pair");
    dPair.innerText = 0;

    if (!isTimerRunning) {
        isTimerRunning = !isTimerRunning;
        let timer = window.setInterval(stopTimer,1000);
    }
    else {
        window.clearInterval(timer)
        hours   = 0;
        minutes = 0;
        seconds = 0; 
        document.getElementById("timer").innerText= "00:00:00"
    }
    
    
    

    dButtonStart.style.background = "rgb(0,255,100)";
    setTimeout ( ( ) => {dButtonStart.style.background = "orange"},300)
    selections = []
    points = 20;
    dScore.innerText = `Score: ${points}`;

    const dTable = document.getElementById("table")
    dTable.replaceChildren([])
    let cards=[];
    let tmpIcons = [...icons]
    for (let i = 0; i<24; i++){
        
        cards.push(`
        <div class='area-card'>
            <div class='card' id="card${i}" onclick="selectCard(${i});">
                <div class='face front'>
                   ${tmpIcons[0]} 
                </div>
                <div class='face back' id="back${i}">
                    <i class='fa-solid fa-question'></i>
                </div>
            </div>
        </div>`)
        
        if (i%2 == 1) {
            tmpIcons.splice(0,1);
        }
    }
    cards.sort( () => Math.random()-0.5)
    dTable.innerHTML = cards.join('')
}

function selectCard(i) {
    const card = document.getElementById(`card${i}`)
    if (card.style.transform != "rotateY(180deg)"){
        card.style.transform = "rotateY(180deg)"
        selections.push(i)
    }
    if(selections.length == 2) {
        
        deSelect(selections)
        selections = [];

    }   
}

function deSelect (selections) {
  
    let dPair  = document.getElementById("pair");
    let pair   = dPair.innerText;
    let card1 = document.getElementById(`card${selections[0]}`)
    let card2 = document.getElementById(`card${selections[1]}`)
    
    let ico1 = card1.children[0].children[0].className;
    let ico2 = card2.children[0].children[0].className;

    let front1 = card1.children[0];
    let front2 = card2.children[0];
    
        if (ico1 == ico2) {
            setTimeout ( () => {
                front1.style.background = "rgb(34, 205, 228)"
                front2.style.background = "rgb(34, 205, 228)"
            },500)
            points = Number(points) + 5;
            pair = Number(pair)+1;
            dPair.innerText = pair;
        }
        else{
            setTimeout ( () => {
                card1.style.transform = "rotateY(360deg)"
                card2.style.transform = "rotateY(360deg)"
            },1000)
            points = Number(points) - 3;   
        }
        dScore.innerText = `Score: ${points}`;
        
}


function stopTimer () {
    
    if (seconds/60 == 1) {
        seconds = 0
        minutes++

        if (minutes/60 == 1) {
            minutes = 0 ;
            hours++
        }
    }    
    const dTimer       = document.getElementById("timer");

    
    if (pair.innerText < 12){
        window.clearInterval(timer)

        seconds++

        let hh = hours.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        let mm = minutes.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        let ss = seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})

        dTimer.innerText   = hh + ":" + mm + ":" + ss;
    }

}
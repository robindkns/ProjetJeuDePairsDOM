window.addEventListener("DOMContentLoaded", event => {
    const audio = document.querySelector("audio");
    audio.volume = 0.01;
    audio.play();
});

function melanger(liste) {
    for (let i = liste.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = liste[i];
        liste[i] = liste[j];
        liste[j] = temp;
    }
    return liste
}

// ------------------------------------------------------MELANGE------------------------------------------------------  //

let tabImgBack = document.querySelectorAll(".card-back img")
let tabSrcImg = []

tabImgBack.forEach(carte => {
    tabSrcImg.push(carte.src)
})

tabSrcImg = melanger(tabSrcImg)

tabImgBack.forEach((carte, i)=> {
    carte.src = tabSrcImg[i]
})

// ------------------------------------------------------DEMARRAGE PARTIE------------------------------------------------------  //

let input = document.querySelector('input')
let bgVidHome = document.querySelector('#bgVideoHome')
let bgVidGame = document.querySelector('#bgVideoGame')
let divPseudo = document.querySelector('.inputPseudo')
let pseudo = document.querySelector('#currentPlayer')
let finTimer = false
let cpt = 0

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value !== "") {

        bgVidGame.style.display = "block"
        bgVidHome.style = "height: 0px; transition: 3s;"
        divPseudo.style.display = "none"
        pseudo.innerText = input.value

        setTimeout(() => {
            chrono(finTimer)
        }, 2000)
        
    }  


})



// ------------------------------------------------------JEU------------------------------------------------------  //

let cards = document.querySelectorAll('.card')
cards = Array.from(cards)
let carteRetournee = false
let firstCarte
let srcFirstCarte
let secondCarte
let srcSecondCarte
let paires = 0
let lock = false
let score = 0
let nbrGame = 0

cards.forEach(carte => {
    carte.addEventListener("click", retournerCarte)
})

function playAgain() {
    console.log("test");
    let plateau = document.querySelector(".game")
    plateau.style.display = "grid"
    

    let tabImgBack = document.querySelectorAll(".card-back img")
    let tabSrcImg = []

    tabImgBack.forEach(carte => {
        tabSrcImg.push(carte.src)
    })

    tabSrcImg = melanger(tabSrcImg)

    tabImgBack.forEach((carte, i)=> {
        carte.src = tabSrcImg[i]
    })
    
    cards.forEach(carte => {
        carte.style.transform = "rotateY(0deg)"
        carte.addEventListener("click", retournerCarte)
    });

    lock = false
    score = 0
    paires = 0
    carteRetournee = false
    firstCarte = ""
    secondCarte = ""
    srcFirstCarte = ""
    srcSecondCarte = ""
    finTimer = false
    nbrGame++
}

function retournerCarte(){

    if (lock == true) {
        return
    }

    this.style.transform = "rotateY(180deg)"

    if (carteRetournee != true){

        carteRetournee = true
        firstCarte = this
        srcFirstCarte = this.querySelector('.card-back img').src
        return;
        

    }

    carteRetournee = false
    secondCarte = this
    srcSecondCarte = this.querySelector('.card-back img').src

    checkPair()
}

function checkPair(){
    if (srcFirstCarte === srcSecondCarte) {
        firstCarte.removeEventListener('click', retournerCarte)
        secondCarte.removeEventListener('click', retournerCarte)
        paires++
    } else {
        lock = true
        setTimeout(() => {
            firstCarte.style.transform = "rotateY(0deg)"
            secondCarte.style.transform = "rotateY(0deg)"
            lock = false
        }, 1000)
    }

    if (paires == 3) {
        score = chrono(true)
        setScore(score,pseudo.innerText)

        setTimeout(() => {

            let plateau = document.querySelector(".game")
            plateau.style.display = "none"
            let modal = document.querySelector(".modalRejouer")
            let body  = document.body
            setTimeout(() => {

                modal.style.display = "block"
                let rejouer = document.querySelector("#play")
                let changeUser = document.querySelector("#changeUser")
                changeUser.addEventListener('click', () => {

                    setTimeout(() => {
                        bgVidGame.style.display = "none"
                        divPseudo.style.display = "flex"
                        input.value =""
                        playAgain()
                    }, 2000)

                    bgVidHome.style = "height: 100%; transition: 2s;"
                    modal.style.display = "none"
                    

                })

                rejouer.addEventListener('click', () => {
                    modal.style.display = "none"
                    playAgain()
                    chrono(finTimer)
                    
                })

            }, 500)

        }, 2000)
    }
}
function chrono(check) {

    let timer = document.querySelector("#compteur")

    if (check === true) {

        let cptScore
        cptScore = cpt
        timer.style.display = "none"
        return cptScore

    }else if (check === false && nbrGame > 0){
        
        timer.innerText = 0
        timer.style.display = "block"
        clearInterval(compteur)
        cpt = 0
        compteur = setInterval(() => {
            cpt++
            timer.innerText = cpt
        }, 1000)

    } else {
        compteur = setInterval(() => {
            cpt++
            timer.innerText = cpt
        }, 1000)
    }
    
}

function setScore(score,user) {
    let divScores = document.querySelector(".scores")
    let scoreUser = document.createElement("span")
    scoreUser.innerText = `${user} : ${score}`
    divScores.appendChild(scoreUser)
}


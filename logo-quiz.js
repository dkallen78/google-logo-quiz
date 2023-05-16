function rnd(floor, ceiling) {
    //----------------------------------------------------//
    //Generates a random number within a range of numbers //
    //----------------------------------------------------//
    //floor(integer): lower bound of the random number    //
    //ceiling(integer): upper bound of the random number  //
    //----------------------------------------------------//
    //return(integer): random number w/in the range       //
    //----------------------------------------------------//

    let range = (ceiling - floor) + 1;
    return Math.floor((Math.random() * range) + floor);
}

function rndNums(num, floor, ceiling) {
    //----------------------------------------------------//
    //Generates an array of unique random numbers within  //
    //  a range                                           //
    //----------------------------------------------------//
    //num(integer): number of random numbers to generate  //
    //floor(integer): lower bound of the random numbers   //
    //ceiling(integer): upper bound of the random numbers //
    //----------------------------------------------------//
    //return(array[integers]): random numbers             //
    //----------------------------------------------------//

    let numsRange = [];
    let rndSet = [];

    for (let i = floor; i <= ceiling; i++) {
        numsRange.push(i);
    }

    for (let i = 0; i < num; i++) {
        rndSet.push(numsRange.splice(rnd(0, numsRange.length - 1), 1)[0]);
    }

    return rndSet;
}

function makeElement(type, id, ...classes) {
    //----------------------------------------------------//
    //Returns an HTML element                             //
    //----------------------------------------------------//
    //type(string): type of HTML element to create        //
    //id(string): id of the element                       //
    //classes(string): classes to add to the element      //
    //----------------------------------------------------//
    //return(element): HTML element                       //
    //----------------------------------------------------//

    let element = document.createElement(type);
    if (typeof id === "string") {element.id = id}
    classes.forEach(x => element.classList.add(x));
    return element;
}

function makeImg(src, id, ...classes) {
    //----------------------------------------------------//
    //Returns an <img> element                            //
    //----------------------------------------------------//
    //src(string): file path to the image file            //
    //id(string): id of the <img> element                 //
    //classes(string): classes to add to the <img> element//
    //----------------------------------------------------//
    //return(element): <img> element                      //
    //----------------------------------------------------//

    let img = makeElement("img", id, ...classes);
    img.src = src;
    return img;
}

function clearElement(...elements) {
    /*
    //Clears the innerHTML of any number of elements      //
    //----------------------------------------------------//
    //elements(DOM element): elements to be cleared       //
    */

    elements.forEach(x => x.innerHTML = "");
}

let totalNumber = 9;

let totalTries = 0;
let totalRight = 0;

let logoPath = [
    "logos/google-admin.png",
    "logos/google-ads.png",
    "logos/google-android.png",
    "logos/google-android-auto.png",
    "logos/google-arcore.png",
    "logos/google-chrome.png",
    "logos/google-chromium.png",
    "logos/google-fitbit.png",
    "logos/google-calendar.png",
    "logos/google-chat.png",
    "logos/google-docs.png",
    "logos/google-drive.png",
    "logos/google-fit.png",
    "logos/google-keep.png",
    "logos/google-lens.png",
    "logos/google-maps.png",
    "logos/google-meet.png",
    "logos/google-pay.png",
    "logos/google-photos.png",
    "logos/google-play.png",
    "logos/google-sheets.png",
    "logos/google-slides.png",
    "logos/google-voice.png",
    "logos/google-recapcha.png",
    "logos/google-stadia.png",
    "logos/google-youtube.png"
];

let logoName = [
    "Admin",
    "Ads",
    "Android",
    "Android Auto",
    "ARCore",
    "Chrome",
    "Chromium",
    "Fitbit",
    "Calendar",
    "Chat",
    "Docs",
    "Drive",
    "Fit",
    "Keep",
    "Lens",
    "Maps",
    "Meet",
    "Pay",
    "Photos",
    "Play",
    "Sheets",
    "Slides",
    "Voice",
    "reCAPTCHA",
    "Stadia",
    "YouTube"
];

async function doQuiz() {

    async function waitForButton(answerIndex) {

        function checkAnswer(guess) {
        if (guess === logoName[answerIndex]) {
            return true;
        }
        return false;
        }

        return new Promise((resolve, reject) => {
        
            for (let i = 1; i <= 4; i++) {
                let choice = document.getElementById(`choice${i}`);
                choice.onclick = () => {
                if (checkAnswer(choice.innerHTML)) {
                    totalRight++;
                } 
                totalTries++;
                updateScore();
                resolve();
                }
            }
        })
    }

    function makeQuizScreen() {
        let quizZone = makeElement("div", "quizZone");

        let logo = makeElement("div", "logo");

        quizZone.appendChild(logo);

        let choiceGrid = makeElement("div", "choiceGrid");

            let choice1 = makeElement("button", "choice1", "choices");
            choiceGrid.appendChild(choice1);
            let choice2 = makeElement("button", "choice2", "choices");
            choiceGrid.appendChild(choice2);
            let choice3 = makeElement("button", "choice3", "choices");
            choiceGrid.appendChild(choice3);
            let choice4 = makeElement("button", "choice4", "choices");
            choiceGrid.appendChild(choice4);

        quizZone.appendChild(choiceGrid);

        let score = makeElement("div", "score");

        quizZone.appendChild(score);

        document.body.appendChild(quizZone);
    }

    function updateScore() {
        let score = document.getElementById("score");
        score.innerHTML = `${totalRight}/${totalTries}`
    }

    makeQuizScreen();
    updateScore();

    let quizItems = rndNums(9, 0, logoPath.length - 1);

    for (let i = 0; i < totalNumber; i++) {

        
        let logo = document.getElementById("logo");
        clearElement(logo);

        let currentLogo = makeImg(logoPath[quizItems[i]], "logoImage");
        currentLogo.height = 100;
        logo.appendChild(currentLogo);

        let answers = rndNums(4, 0, logoPath.length - 1)

        if (answers.includes(quizItems[i]) === false) {
            answers[rnd(0, 3)] = quizItems[i];
        }

        for (let j = 1; j <= 4; j++) {
            let choice = document.getElementById(`choice${j}`);
            choice.innerHTML = logoName[answers[j-1]];
        }
        await waitForButton(quizItems[i]);
    }

    let choices = document.getElementById("choiceGrid");
    clearElement(choices);

    let reset = makeElement("button");
    reset.onclick = () => {
        location.reload();
    }
    reset.innerHTML = "Replay?";
    choices.appendChild(reset);
}
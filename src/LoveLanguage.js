import QuestionsData from './QuestionsData.json';
import { fire, db } from './FirebaseData';

export var sum = 3;

var counterA = 0;
var counterB = 0;
var counterC = 0;
var counterD = 0;
var counterE = 0;

var leadingCounter;

class Question {
    constructor(alt1, alt2, index) {
        this.alt1 = alt1;
        this.alt2 = alt2;
        this.index = index;
        console.log(alt1);
    }
}

export function calculateResults(alt1Values, alt2Values) {
    let complete = true;
    ResetResults();

    for (let i = 0; i < sum; i++) {
        if (alt1Values[i] == true) {
            //  console.log("shutup "+alt1Values[i])
            let index = "q" + i;
            let letter = QuestionsData[index].alt1Letter;
            addOneToLetter(letter);
        }
        if (alt2Values[i] == true) {
            let index = "q" + i;
            let letter = QuestionsData[index].alt2Letter;
            addOneToLetter(letter);
        }

        if (alt1Values[i] == false && alt2Values[i] == false) {
            complete = false;
            console.log("You ain't done yet. Complete the test.");
        }
    }
    if (complete == true) {
        //printResults();
        return SetLeadingCounter();
    }
    return null;
}
async function writeLetterToDatabase(letter) {
    db.collection("users").doc(fire.auth().currentUser.uid).update({
        loveLanguage: letter,
    });
}
function printResults() {
    console.log("A : " + counterA);
    console.log("B : " + counterB);
    console.log("C : " + counterC);
    console.log("D : " + counterD);
    console.log("E : " + counterE);
    console.log("Leader : " + leadingCounter)
}

function SetLeadingCounter() {
    let holder = counterA;
    leadingCounter = "A";

    if (holder < counterB) {
        holder = counterB;
        leadingCounter = "B";
    }
    if (holder < counterC) {
        holder = counterC;
        leadingCounter = "C";
    }
    if (holder < counterD) {
        holder = counterD;
        leadingCounter = "D";
    }
    if (holder < counterE) {
        holder = counterE;
        leadingCounter = "E";
    }
    writeLetterToDatabase(leadingCounter);
    return leadingCounter;

}

function ResetResults() {
    counterA = 0;
    counterB = 0;
    counterC = 0;
    counterD = 0;
    counterE = 0;
}

function addOneToLetter(letter) {
    console.log("shutup : " + letter);
    if (letter == "A") {
        counterA++;
    }
    if (letter == "B") {
        counterB++;
    }
    if (letter == "C") {
        counterC++;
    }
    if (letter == "D") {
        counterD++;
    }
    if (letter == "E") {
        counterE++;
    }
}

export function getQuestions() {
    var questions = [];

    for (let i = 0; i < sum; i++) {
        let index = "q" + i;
        questions[i] = new Question(
            QuestionsData[index].alt1,
            QuestionsData[index].alt2,
            i);
    }
    return questions;

}
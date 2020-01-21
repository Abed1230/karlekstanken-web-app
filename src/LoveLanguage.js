import QuestionsData from './QuestionsData.json';
import { db } from './FirebaseData';

export var sum = 20;

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
    }
}

export function calculateResults(alt1Values, alt2Values, user) {
    const notCompleteIndexes = [];
    ResetResults();

    for (let i = 0; i < sum; i++) {
        if (alt1Values[i] === true) {
            let index = "q" + i;
            let letter = QuestionsData[index].alt1Letter;
            addOneToLetter(letter);
        }
        if (alt2Values[i] === true) {
            let index = "q" + i;
            let letter = QuestionsData[index].alt2Letter;
            addOneToLetter(letter);
        }

        if (alt1Values[i] === false && alt2Values[i] === false) {
            notCompleteIndexes.push(i);
        }
    }

    if (notCompleteIndexes.length > 0) {
        return {
            notCompleteIndexes: notCompleteIndexes
        };
    }

    const lang = SetLeadingCounter(user);
    return {
        lang: lang
    };
}
async function writeLetterToDatabase(letter, user) {
    db.runTransaction(async t => {
        const userRef = db.collection("users").doc(user.uid);
        const coupleDataRef = user.coupleDataRef;

        t.update(userRef, { loveLanguage: letter });
        t.update(coupleDataRef, { [`loveLanguages.${user.uid}`]: letter });
    });
}

function SetLeadingCounter(user) {
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
    writeLetterToDatabase(leadingCounter, user);
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
    if (letter === "A") {
        counterA++;
    }
    if (letter === "B") {
        counterB++;
    }
    if (letter === "C") {
        counterC++;
    }
    if (letter === "D") {
        counterD++;
    }
    if (letter === "E") {
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
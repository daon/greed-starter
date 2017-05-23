export const NAME = 'Greed';

const scoringRules = [
    function singleOne(diceAnalysis) {
        if (diceAnalysis[1] > 0) {
            let myDiceAnalysis = Object.assign({}, diceAnalysis);
            myDiceAnalysis[1]--;
            return {
                diceAnalysis: myDiceAnalysis,
                score: 100
            }
        } else {
            return {
                diceAnalysis,
                score: 0
            }
        }
    },
    function tripleOne(diceAnalysis) {
        if (diceAnalysis[1] >= 3) {
            let myDiceAnalysis = Object.assign({}, diceAnalysis);
            myDiceAnalysis[1]-=3;
            return {
                diceAnalysis: myDiceAnalysis,
                score: 1000
            }
        } else {
            return {
                diceAnalysis,
                score: 0
            }
        }
    }
]

function isElementValid(digit) {
    return digit >= 1 && digit <= 6;
}

export function score(dice) {
    if (
        !Array.isArray(dice)
        || dice.length !== 5
        || !dice.every(isElementValid)
    ) {
        return "invalid input";
    }
    else {
        return scoreRecursively(analyzeDice(dice));
    }
}

export function analyzeDice(dice) {
    return dice.reduce((previousValue, currentValue) => {
        if (previousValue[currentValue]) {
            previousValue[currentValue]++;
        } else {
            previousValue[currentValue] = 1;
        }
        return previousValue;
    }, {});
}

function scoreRecursively(diceAnalysis) {
    const ruleResults = scoringRules.map(fn => fn(diceAnalysis));

    let sortedResults = ruleResults.sort((a, b) => b.score - a.score);
    if (sortedResults[0].score > 0) {
        return sortedResults[0].score + scoreRecursively(sortedResults[0].diceAnalysis);
    }
    else {
        return sortedResults[0].score;
    }
}


/* Write your code here */
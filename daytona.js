let turnArray = [];
turnArray = 'a39,b39,c39,a40,b40,c40,a41,b41,c41,a42,b42,c42,a43,b43,c43,a44,b44,c44,a45,b45,c45,a46,b46,c46,a47,b47,c47,a48,b48,c48,a49,b49,c49,a50,b50,c50,a51,b51,c51,a52,b52,c52,a53,b53,c53,a54,b54,c54,a55,b55,c55,a56,b56,c56,a57,b57,c57,a20,b20,c20,a21,b21,c21,a22,b22,c22,a23,b23,c23,a24,b24,c24,a25,b25,c25,a26,b26,c26,a27,b27,c27,a28,b28,c28,a29,b29,c29,a30,b30,c30,a31,b31,c31,a32,b32,c32,a33,b33,c33,a34,b34,c34,a35,b35,c35,a36,b36,c36,a37,b37,c37,a38,b38,c38,a1,b1,c1,pitstall1,pit1,pitt1,a2,b2,c2,pitstall2,pit2,pitt2,a3,b3,c3,pitstall3,pit3,pitt3,a4,b4,c4,pitstall4,pit4,pitt4,a5,b5,c5,pitstall5,pit5,pitt5,a6,b6,c6,pitstall6,pit6,pitt6,a7,b7,c7,pitstall7,pit7,pitt7,a8,b8,c8,pitstall8,pit8,pitt8,a9,b9,c9,pitstall9,pit9,pitt9,a10,b10,c10,pitstall10,pit10,pitt10,a11,b11,c11,pitstall11,pit11,pitt11,a12,b12,c12,pitstall12,pit12,pitt12,a13,b13,c13,pitstall13,pit13,pitt13,a14,b14,c14,pitstall14,pit14,pitt14,a15,b15,c15,pitstall15,pit15,pitt15,a16,b16,c16,pitstall16,pit16,pitt16,a17,b17,c17,pitstall17,pit17,pitt17,a18,b18,c18,pitstall18,pit18,pitt18,a19,b19,c19,pitstall19,pit19,pitt19'.split(",");
function orderOfTurns () {
    for (let i = 1; i < 58; i++) {
        turnArray.push(`a${i}`);
        turnArray.push(`b${i}`);
        turnArray.push(`c${i}`);

        if (i < 20) {
            turnArray.push(`pitstall${i}`);
            turnArray.push(`pit${i}`);
            turnArray.push(`pitt${i}`);
        }
    }
}


function diceRoll() {
    let choices = ["9", "8", "7", "9", "8", "7", "9", "8", "7", "9", "8", "7", "C"];

    let random = choices[Math.floor(Math.random() * choices.length)];

    if (random == "C") {
        let chanceChoices = ["12", "11", "10", "6", "6", "5", "12", "11", "10", "6", "6", "5", "12", "11", "10", "6", "6", "5", "12", "11", "10", "6", "6", "5", "12", "11", "10", "6", "6", "5", "12", "11", "10", "6", "6", "5", "12", "11", "10", "6", "6", "5", "12", "11", "10", "6", "6", "5", "C", "D"];
        random = chanceChoices[Math.floor(Math.random() * chanceChoices.length)];
    }

    return random;
}

function convertSquareToCoords(square) {
    let x, y, tempSplit, addY = 0;
    if (square.length == 2) {
        tempSplit = square.split('');
    } else if (square.length == 3) {
        let tempTempSplit = square.split('');
        tempSplit = [tempTempSplit[0], tempTempSplit[1] + tempTempSplit[2]];
    } else {
        let newSquare;
        if (square.includes('stall')) {
            newSquare = square.replaceAll('pitstall', 'a');
            addY = 1;
        } else if (square.includes('tt')) {
            newSquare = square.replaceAll('pitt', 'a');
            addY = 3;
        } else {
            newSquare = square.replaceAll('pit', 'a');
            addY = 2;
        }
        let tempTempSplit = newSquare.split('');
        if (tempTempSplit.length == 3) {
            tempSplit = [tempTempSplit[0], tempTempSplit[1] + tempTempSplit[2]];
        } else {
            tempSplit = [tempTempSplit[0], tempTempSplit[1]];
        }
    }
    
    if (tempSplit[0] == 'a') {
        y = 3 + addY;
    } else if (tempSplit[0] == 'b') {
        y = 2;
    } else {
        y = 1;
    }

    if (tempSplit[1] < 20) {
        x = 20 - tempSplit[1];
    } else if (tempSplit[1] < 39) {
        x = 58 - tempSplit[1];
    } else {
        x = 96 - tempSplit[1];
    }

    return [x, y];
}

function convertCoordsToSquare(coords) {
    let square = [0, 0];

    if (coords[1] == 3) {
        square[0] = 'a';
    } else if (coords[1] == 2) {
        square[0] = 'b';
    } else if (coords[1] == 1) {
        square[0] = 'c';
    } else if (coords[1] == 5) {
        square[0] = 'pit';
    } else if (coords[1] == 6) {
        square[0] = 'pitt';
    } else if (coords[1] == 4) {
        square[0] = 'pitstall';
    }

    if (coords[0] < 20) {
        square[1] = 20 - coords[0];
    } else if (coords[0] < 39) {
        square[1] = 58 - coords[0];
    } else {
        square[1] = 96 - coords[0];
    }

    return square.join("");
}

function singleCarTurn(car, position, square) {

    let finished = false;

    if (!convertCoordsToSquare(position).includes('pit')) {
        if (raceInfo.fuel) fuel[car] = fuel[car] - Math.floor(Math.random() * 3);

        if (raceInfo.tireWear) tires[car] = tires[car] - Math.floor(Math.random() * 2.5);
    }

    let roll = diceRoll();

    if (roll == "D") {
        if (raceInfo.damage) {
            bodyDamage[car] = bodyDamage[car] - 50;
        }
        roll = 5;
    } else if (roll == "C") {
        if (raceInfo.damage) {
            caution(car, position, square);
        }
        roll = 5;
    }

    let editedRoll = (roll - 3 + currentDraft[car] - lostSpaces[car]);
    if (convertCoordsToSquare(position).includes('pit')) {
        editedRoll = 3;
    }

    let newCoords;

    function ifPos57() {
        if (position[0] == 57) {
            laps[car] = laps[car] + 1;
            checkLapLed(car);

            if (laps[car] == raceInfo.laps) {
                console.log(car)
                finishedCars.push(car);
                finished = true;
            }
        }
    }

    let voidTurn = false;

    for (let i = 0; i < editedRoll; i++) {
        
        newCoords = position;

        setTimeout(function() {

            if (!voidTurn) {
                let square = convertCoordsToSquare(position);
                document.getElementById(square).classList.remove(car);
                
                if (square.includes('pitstall')) {
                    let pitResult = pit(car);

                    if (pitResult == 0) {
                        newCoords = position;
                        if (position[1] != 1 && document.getElementById(convertCoordsToSquare([position[0] + 1, position[1] + 1])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1] + 1];
                        } else if (document.getElementById(convertCoordsToSquare([position[0], position[1]])).classList.length == 0) {
                            newCoords = [position[0], position[1]];
                        }
                    } else {
                        newCoords = position;
                        voidTurn = true;
                        removeFromArray(toPitCars, car)
                    }
                } else {
                    if (position[0] == 57) {
                        if (toPitCars.includes(car)) {
                            ifPos57();
                            if (document.getElementById('pitt19').classList.length == 0) {
                                newCoords = convertSquareToCoords('pitt19');
                            } else if (document.getElementById('pit19').classList.length == 0) {
                                newCoords = convertSquareToCoords('pit19');
                            }
                        } else
                        if (position[1] != 3 && document.getElementById(convertCoordsToSquare([1, position[1] + 1])).classList.length == 0) {
                            ifPos57();
                            newCoords = [1, position[1] + 1];
                        } else if (document.getElementById(convertCoordsToSquare([1, position[1]])).classList.length == 0) {
                            ifPos57();
                            newCoords = [1, position[1]];
                        } else if (position[1] != 1 && document.getElementById(convertCoordsToSquare([1, position[1] - 1])).classList.length == 0) {
                            ifPos57();
                            newCoords = [1, position[1] - 1];
                        }
                    } else if (square == 'pit1' || square == 'pitstall1' || square == 'pitt1') {
                        if (document.getElementById('a38').classList.length == 0) {
                            newCoords = convertSquareToCoords('a38');
                        } else if (document.getElementById('b38').classList.length == 0) {
                            newCoords = convertSquareToCoords('b38');
                        }
                    } else if (convertCoordsToSquare(position).includes('pit') && toPitCars.includes(car)) {
                        if (position[1] != 4 && document.getElementById(convertCoordsToSquare([position[0] + 1, position[1] - 1])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1] - 1];
                        } else if (document.getElementById(convertCoordsToSquare([position[0] + 1, position[1]])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1]];
                        } else if (position[1] != 6 && document.getElementById(convertCoordsToSquare([position[0] + 1, position[1] + 1])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1] + 1];
                        }
                    } else if (convertCoordsToSquare(position).includes('pit')) {
                        if (position[1] != 6 && document.getElementById(convertCoordsToSquare([position[0] + 1, position[1] + 1])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1] + 1];
                        } else if (document.getElementById(convertCoordsToSquare([position[0] + 1, position[1]])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1]];
                        } else if (position[1] != 4 && document.getElementById(convertCoordsToSquare([position[0] + 1, position[1] - 1])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1] - 1];
                        }
                    } else {
                        if (position[1] != 3 && document.getElementById(convertCoordsToSquare([position[0] + 1, position[1] + 1])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1] + 1];
                        } else if (document.getElementById(convertCoordsToSquare([position[0] + 1, position[1]])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1]];
                        } else if (position[1] != 1 && document.getElementById(convertCoordsToSquare([position[0] + 1, position[1] - 1])).classList.length == 0) {
                            newCoords = [position[0] + 1, position[1] - 1];
                        } else if (position[1] != 1 && document.getElementById(convertCoordsToSquare([position[0], position[1] - 1])).classList.length == 0) {
                            newCoords = [position[0], position[1] - 1];
                        }
                    }
                }
                
                document.getElementById(square).classList.remove(car);
                let newSquare = convertCoordsToSquare(newCoords);
                if (!finished) document.getElementById(newSquare).classList.add(car);

                position = newCoords;
            }
        }, i * 250);
    }
}

function fullRotation() {
    calculatePositionAfter10Rounds();
    for (let i = 0; i < turnArray.length; i++) {
        setTimeout(function() {
            let square = turnArray[i];
            if (document.getElementById(square).classList.length != 0) {
                singleCarTurn(document.getElementById(square).classList[0], convertSquareToCoords(square), square);
                calculateLostSpaces(document.getElementById(square).classList[0]);
            }
            if (i == turnArray.length - 1) {
                getDraftsAndToPit();

                setTimeout(function() {
                    fullRotation();
                    return 0;
                }, 1000);
            }
        }, 25 * i);
    }
}

function getDraftsAndToPit() {
    turnArray.forEach(function(square) {
        if (!square.includes('pit')) {
            let car = document.getElementById(square).classList[0];
            if (document.getElementById(square).classList.length != 0) {
                //Drafts
                let coords = convertSquareToCoords(square);
                let newCoords = addXToCoords(coords, 1);
                if (document.getElementById(convertCoordsToSquare(newCoords)).classList.length != 0) {
                    currentDraft[car] = 2;
                }
                else {
                    coords = convertSquareToCoords(square);
                    newCoords = addXToCoords(coords, 2);
                    if (document.getElementById(convertCoordsToSquare(newCoords)).classList.length != 0) {
                        currentDraft[car] = 1;
                    }
                    else {
                        currentDraft[car] = 0;
                    }
                }
                //ToPit
                needsToPit(car);
            }
        }
    });
}

function addXToCoords(coords, toAdd) {
    let twoDraft = coords[0] + toAdd;
    let oneDraft = coords[0] + toAdd;
    if (coords[0] == 57) {
        twoDraft = toAdd;
        oneDraft = toAdd;
    } else if (coords[0] == 56) {
        twoDraft = toAdd - 1;
        oneDraft = coords[0] + toAdd;
    }
    if (toAdd == 2) {
        coords = [twoDraft, coords[1]];
    } else {
        coords = [oneDraft, coords[1]];
    }
    return coords;
}

function needsToPit(car) {
    if (tires[car] < 50) {
        if (!toPitCars.includes(car)) {
            toPitCars.push(car);
        }
    }
    if (bodyDamage[car] <= 50) {
        if (!toPitCars.includes(car)) {
            toPitCars.push(car);
        }
    }
    if (fuel[car] < 15) {
        if (!toPitCars.includes(car)) {
            toPitCars.push(car);
        }
    }
}

function calculateLostSpaces(car) {
    let totalDamage = bodyDamage[car] + tires[car];
    if (totalDamage < 25) {
        lostSpaces[car] = 5;
    }
    else if (totalDamage < 50) {
        lostSpaces[car] = 4;
    }
    else if (totalDamage < 80) {
        lostSpaces[car] = 3;
    }
    else if (totalDamage < 120) {
        lostSpaces[car] = 2;
    }
    else if (totalDamage < 150) {
        lostSpaces[car] = 1;
    } else {
        lostSpaces[car] = 0;
    }
}

function pit(car) {
    if (fuel[car] == 100 && tires[car] == 100 && bodyDamage[car] == 100) {
        return 0;
    } else {
        fuel[car] = 100;

        if (tires[car] < 50) {
            tires[car] = tires[car] + 50;
        } else {
            tires[car] = 100
        }
        
        totalRoundsInPit[car] = totalRoundsInPit[car] + 1;
    
        if (bodyDamage[car] < 50) {
            bodyDamage[car] = bodyDamage[car] + 15;
        } else {
            bodyDamage[car] = 100;
        }
        return 1;
    }
}

function removeFromArray(array, item) {
    for (let i = 0; i < array.length; i++){ 
        if ( array[i] == item) { 
            array.splice(i, 1); 
        }
    }
}

function findCarInFirst() {
    let highestLaps = findCurrentBestLaps();

    let car, position;
    let isCarFound = false;

    turnArray.forEach(function(value) {
        if (laps[document.getElementById(value).classList[0]] == highestLaps) {
            if (!isCarFound) {
                car = document.getElementById(value).classList[0];
                position = value;
                isCarFound = true;
            }
        }
    });

    return [car, position, highestLaps];
}

function leaderBoard() {
    let carInFirst = findCarInFirst();

    let car = carInFirst[0];
    let position = carInFirst[1];
    let highestLaps = carInFirst[2];
    let lowestLaps = findCurrentWorstLaps();

    let order = orderOfTurnsFromX(position);
    let leaderBoardCars = [];
    let numOfCarsRecorded = 0;

    let lapsSearchingFor = highestLaps;

    finishedCars.forEach(function(car) {
        leaderBoardCars.push(car);
    });

    while (lapsSearchingFor != lowestLaps - 1) {
        order.forEach(function(value) {
            if (document.getElementById(value).classList.length != 0 && laps[document.getElementById(value).classList] == lapsSearchingFor) {
                leaderBoardCars.push(document.getElementById(value).classList[0]);
            }
        });

        lapsSearchingFor--;
    }

    return leaderBoardCars;
}

function leaderBoardBasedOnLapsLed() {
    let carArray = ["eighteen","eightyeight","eightythree","five","fourteen","fourtyeight","fourtyone","fourtythree","fourtytwo","nine","ninetyfive","ninetynine","seventeen","sixteen","sixtytwo","ten","thirtyeight","thirtytwo","three","twentyfive","twentyfour","twentyone","twentyseven","twentythree","two"];
    let lapsLedLB = [];
    let currentBestLapsLed = 0;
    carArray.forEach(function(car) {
        if (lapsLed[car] > currentBestLapsLed) {
            currentBestLapsLed = lapsLed[car];
        }
    });

    for (let i = currentBestLapsLed; i >= 0; i--) {
        carArray.forEach(function(car) {
            if (lapsLed[car] == currentBestLapsLed) {
                lapsLedLB.push(car);
            }
        });
        currentBestLapsLed--;
    }

    return lapsLedLB;
}

function leaderBoardBasedOnPitRounds() {
    let carArray = ["eighteen","eightyeight","eightythree","five","fourteen","fourtyeight","fourtyone","fourtythree","fourtytwo","nine","ninetyfive","ninetynine","seventeen","sixteen","sixtytwo","ten","thirtyeight","thirtytwo","three","twentyfive","twentyfour","twentyone","twentyseven","twentythree","two"];
    let pitRoundsLB = [];
    let currentBestPitRounds = 0;
    carArray.forEach(function(car) {
        if (totalRoundsInPit[car] > currentBestPitRounds) {
            currentBestPitRounds = totalRoundsInPit[car];
        }
    });

    for (let i = currentBestPitRounds; i >= 0; i--) {
        carArray.forEach(function(car) {
            if (totalRoundsInPit[car] == currentBestPitRounds) {
                pitRoundsLB.push(car);
            }
        });
        currentBestPitRounds--;
    }

    return pitRoundsLB;
}

function leaderBoardBasedOnPlusMinus() {
    let carArray = ["eighteen","eightyeight","eightythree","five","fourteen","fourtyeight","fourtyone","fourtythree","fourtytwo","nine","ninetyfive","ninetynine","seventeen","sixteen","sixtytwo","ten","thirtyeight","thirtytwo","three","twentyfive","twentyfour","twentyone","twentyseven","twentythree","two"];
    let plusMinusLB = [];
    let currentBestPlusMinus = 0;
    let currentWorstPlusMinus = 0;
    carArray.forEach(function(car) {
        if ((startPosition[car] - currentPosition[car]) > currentBestPlusMinus) {
            currentBestPlusMinus = (startPosition[car] - currentPosition[car]);
        }
        if ((startPosition[car] - currentPosition[car]) <= currentWorstPlusMinus) {
            currentWorstPlusMinus = (startPosition[car] - currentPosition[car]);
        }
    });

    for (let i = currentBestPlusMinus; i >= currentWorstPlusMinus; i--) {
        carArray.forEach(function(car) {
            if ((startPosition[car] - currentPosition[car]) == currentBestPlusMinus) {
                plusMinusLB.push(car);
            }
        });
        currentBestPlusMinus--;
    }

    return plusMinusLB;
}

function leaderBoardBasedOnPlusMinus10Rounds() {
    let carArray = ["eighteen","eightyeight","eightythree","five","fourteen","fourtyeight","fourtyone","fourtythree","fourtytwo","nine","ninetyfive","ninetynine","seventeen","sixteen","sixtytwo","ten","thirtyeight","thirtytwo","three","twentyfive","twentyfour","twentyone","twentyseven","twentythree","two"];
    let plusMinusLB = [];
    let currentBestPlusMinus = 0;
    let currentWorstPlusMinus = 0;
    carArray.forEach(function(car) {
        if ((positionAfter.round10[car] - currentPosition[car]) > currentBestPlusMinus) {
            currentBestPlusMinus = (positionAfter.round10[car] - currentPosition[car]);
        }
        if ((positionAfter.round10[car] - currentPosition[car]) <= currentWorstPlusMinus) {
            currentWorstPlusMinus = (positionAfter.round10[car] - currentPosition[car]);
        }
    });

    for (let i = currentBestPlusMinus; i >= currentWorstPlusMinus; i--) {
        carArray.forEach(function(car) {
            if ((positionAfter.round10[car] - currentPosition[car]) == currentBestPlusMinus) {
                plusMinusLB.push(car);
            }
        });
        currentBestPlusMinus--;
    }

    return plusMinusLB;
}

function findStartPosition() {
    let order = leaderBoard();

    for (let i = 0; i < order.length; i++) {
        startPosition[order[i]] = i + 1;
    }
}

function findCurrentPosition() {
    let order = leaderBoard();

    for (let i = 0; i < order.length; i++) {
        currentPosition[order[i]] = i + 1;
    }
}

function leaderBoardDisplay() {
    if (document.getElementById('LBTable') != null) {
        document.getElementById('LBTable').remove();
    }

    if (document.getElementById('INFOTable') != null) {
        document.getElementById('INFOTable').remove();
    }

    if (document.getElementById('RACETable') != null) {
        document.getElementById('RACETable').remove();
    }

    let table = document.createElement('table');
    table.id = 'LBTable';
    let leaderBoardCars = leaderBoard();

    let tableInfo = document.createElement('table');
    tableInfo.id = 'INFOTable';

    let raceInfoTable = document.createElement('table');
    raceInfoTable.id = 'RACETable';

    let numOfRecords = 1;
    table.innerHTML += `<tr height="40"><td width="35%">Laps</td><td>Car</td><td width="35%">Position</td>`;
    tableInfo.innerHTML += `<tr height="40"><td width="10%">Damage</td><td width="10%">Tires</td><td>Fuel</td><td width="10%">Car</td>`;
    raceInfoTable.innerHTML += `<tr height="40"><td width="35%">Pit Rounds</td><td>Laps Led</td><td width="35%">Car</td>`;
    leaderBoardCars.forEach(function(value) {
        table.innerHTML += `<tr height="40"><td width="35%">${laps[value]}</td><td class = '${value}'></td><td width="35%">${numOfRecords}</td>`;
        tableInfo.innerHTML += `<tr height="40"><td width="10%">${bodyDamage[value]}</td><td width="10%">${tires[value]}</td><td width="10%">${fuel[value]}</td><td class = '${value}'></td>`;
        raceInfoTable.innerHTML += `<tr height="40"><td width="35%">${totalRoundsInPit[value]}</td><td width="35%">${lapsLed[value]}</td><td class = '${value}'></td>`;
        numOfRecords++;
    });

    document.getElementById('menu').appendChild(table);
    menu2.appendChild(tableInfo);
    menu3.appendChild(raceInfoTable);
}

function findCurrentBestLaps() {
    let carArray = ["eighteen","eightyeight","eightythree","fiftyfour","five","fourteen","fourtyeight","fourtyone","fourtyseven","fourtythree","fourtytwo","nine","nineteen","ninetyfive","ninetynine","seventeen","sixteen","sixtytwo","ten","thirtyeight","thirtythree","thirtytwo","three","twenty","twentyfive","twentyfour","twentyone","twentyseven","twentythree","two"];
    let highestLaps = -1;
    carArray.forEach(function(car) {
        if (laps[car] > highestLaps) {
            highestLaps = laps[car];
        }
    });

    return highestLaps;
}

function findCurrentBestLapsNoX(car) {
    let carArray = ["eighteen","eightyeight","eightythree","fiftyfour","five","fourteen","fourtyeight","fourtyone","fourtyseven","fourtythree","fourtytwo","nine","nineteen","ninetyfive","ninetynine","seventeen","sixteen","sixtytwo","ten","thirtyeight","thirtythree","thirtytwo","three","twenty","twentyfive","twentyfour","twentyone","twentyseven","twentythree","two"];
    removeFromArray(carArray, car);
    let highestLaps = -1;
    carArray.forEach(function(car) {
        if (laps[car] > highestLaps) {
            highestLaps = laps[car];
        }
    });

    return highestLaps;
}

function findCurrentWorstLaps() {
    let carArray = ["eighteen","eightyeight","eightythree","fiftyfour","five","fourteen","fourtyeight","fourtyone","fourtyseven","fourtythree","fourtytwo","nine","nineteen","ninetyfive","ninetynine","seventeen","sixteen","sixtytwo","ten","thirtyeight","thirtythree","thirtytwo","three","twenty","twentyfive","twentyfour","twentyone","twentyseven","twentythree","two"];
    let lowestLaps = 1000;
    carArray.forEach(function(car) {
        if (laps[car] < lowestLaps) {
            lowestLaps = laps[car];
        }
    });

    return lowestLaps;
}

function orderOfTurnsFromX(car) {
    let hasSeenCar = false;
    let newOrder = [];
    let skippedSpaces = [];
    turnArray.forEach(function(value) {
        if (document.getElementById(value).classList[0] == car) {
            hasSeenCar = true;
            newOrder.push(value);
        } else {
            if (hasSeenCar) {
                newOrder.push(value);
            } else {
                skippedSpaces.push(value);
            }
        }
    });
    skippedSpaces.forEach(function(value) {
        newOrder.push(value);
    });

    return newOrder;
}

function checkLapLed(car) {
    if (laps[car] > findCurrentBestLapsNoX(car) && findCurrentBestLapsNoX(car) != -1) {
        lapsLed[car] = lapsLed[car] + 1;
    }
}

let finalPosition = 1;
function startGameTable() {
    let LB = document.getElementById('finalLBTable');
    LB.innerHTML = `
    <table id="startRaceForm">
        <tr>
            <td colspan="2">Race Info</td>
        </tr>
        <tr>
            <td>Laps</td>
            <td><input id="lapsInput" placeholder="# Of Laps"></td>
        </tr>
        <tr>
            <td>Tire Wear</td>
            <td><input id="tireWearInput" placeholder="true or false"></td>
        </tr>
        <tr>
            <td>Fuel</td>
            <td><input id="fuelInput" placeholder="true or false"></td>
        </tr>
        <tr>
            <td>Damage</td>
            <td><input id="damageInput" placeholder="true or false"></td>
        </tr>
        <tr>
            <td colspan="2"><button id="startGame">Start Race</button></td>
        </tr>
    </table>`;
}

function findStuff() {
    leaderBoardDisplay();
    findCurrentPosition();
    let lapsLedLeaderBoard = leaderBoardBasedOnLapsLed();
    let pitRoundsLeaderBoard = leaderBoardBasedOnPitRounds();
    let plusMinusLeaderBoard = leaderBoardBasedOnPlusMinus();
    let plusMinusLeaderBoardRound10 = leaderBoardBasedOnPlusMinus10Rounds();
    localStorage.setItem('leaderBoard', leaderBoard());
    localStorage.setItem('laps', JSON.stringify(laps));
    localStorage.setItem('lapsLed', JSON.stringify(lapsLed));
    localStorage.setItem('currentPosition', JSON.stringify(currentPosition));
    localStorage.setItem('totalRoundsInPit', JSON.stringify(totalRoundsInPit));
    localStorage.setItem('lapsLedLB', JSON.stringify(lapsLedLeaderBoard));
    localStorage.setItem('pitRoundsLB', JSON.stringify(pitRoundsLeaderBoard));
    localStorage.setItem('plusMinusLB', JSON.stringify(plusMinusLeaderBoard));
    localStorage.setItem('plusMinusLB10Rounds', JSON.stringify(plusMinusLeaderBoardRound10));
    localStorage.setItem('teamLeaderboard', JSON.stringify(calculateTeamLeaderboard()));
}
setInterval(findStuff, 1000);

//Menu
//let menu = document.createElement("div");
let menu2 = document.createElement("div");
let menu3 = document.createElement("div");
let menu4 = document.createElement("div");

//menu.id = "menu";
menu2.id = "menu2";
menu3.id = "menu3";
menu4.id = "menu4";

//menu.classList.add('menu');
menu2.classList.add('menu');
menu3.classList.add('menu');
menu4.classList.add('menu');

//menu.innerHTML = "";
menu2.innerHTML = "<div id='menuheader2'><h1>Car Info</h1></div>";
menu3.innerHTML = "<div id='menuheader3'><h1>Race Info</h1></div>";
menu4.innerHTML = "<div id='menuheader4'><h1>Race Settings</h1></div>";
menu4.innerHTML += `<div id='finalLBTable'></div>`;

setTimeout(function() {
    document.getElementById('body').appendChild(menu);
    document.getElementById('body').appendChild(menu2);
    document.getElementById('body').appendChild(menu3);
    document.getElementById('body').appendChild(menu4);
}, 1000);

//Hide/Show Menu
let key = "Digit1";
let key2 = "Digit2";
let key3 = "Digit3";
let key4 = "Digit4";

var menuHidden = false;
var menuHidden2 = false;
var menuHidden3 = false;
var menuHidden4 = false;

function hideMenu(a) {
    if (a == "1") {
        menu.style.display = "none";
        menuHidden = true;
    } else if (a == "2") {
        menu2.style.display = "none";
        menuHidden2 = true;
    } else if (a == "3") {
        menu3.style.display = "none";
        menuHidden3 = true;
    } else if (a == "4") {
        menu4.style.display = "none";
        menuHidden4 = true;
    }
}
function showMenu(a) {
    if (a == "1") {
        menu.style.display = "initial";
        menuHidden = false;
    } else if (a == "2") {
        menu2.style.display = "initial";
        menuHidden2 = false;
    } else if (a == "3") {
        menu3.style.display = "initial";
        menuHidden3 = false;
    } else if (a == "4") {
        menu4.style.display = "initial";
        menuHidden4 = false;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code == key) {
        if (menuHidden) {
            showMenu('1');
        } else {
            hideMenu('1');
        }
    } else if (event.code == key2) {
        if (menuHidden2) {
            showMenu('2');
        } else {
            hideMenu('2');
        }
    } else if (event.code == key3) {
        if (menuHidden3) {
            showMenu('3');
        } else {
            hideMenu('3');
        }
    } else if (event.code == key4) {
        if (menuHidden4) {
            showMenu('4');
        } else {
            hideMenu('4');
        }
    }
});

setTimeout(function() {
    hideMenu('1');
    hideMenu('2');
    hideMenu('3');
    hideMenu('4');

}, 1000);

function randomStart() {
    //a39 to a51
    //b39 to b50
    let carArray = ["eighteen","eightyeight","eightythree","five","fourteen","fourtyeight","fourtyone","fourtythree","fourtytwo","nine","ninetyfive","ninetynine","seventeen","sixteen","sixtytwo","ten","thirtyeight","thirtytwo","three","twentyfive","twentyfour","twentyone","twentyseven","twentythree","two"];
    let spaceArray = ["a39","a40","a41","a42","a43","a44","a45","a46","a47","a48","a49","a50","a51","b39","b40","b41","b42","b43","b44","b45","b46","b47","b48","b49","b50"];

    for (let i = 0; i < spaceArray.length; i++) {
        let randomCar = carArray[Math.floor(Math.random() * carArray.length)];

        document.getElementById(spaceArray[i]).classList.add(randomCar);

        removeFromArray(carArray, randomCar);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        startGameTable();
        setTimeout(function() {
            document.getElementById("startGame").addEventListener("click", startGame);
            document.getElementById("playButton").addEventListener("click", function() {
                document.getElementById('load').remove();
                showMenu('4');
            });
        }, 1000);
    }, 1000);
});

let raceInfo = {
    fuel: true,
    damage: true,
    tireWear: true,
    laps: 50
}

function startGame() {
    //Fuel
    if (document.getElementById("fuelInput").value == 'false') {
        raceInfo.fuel = false;
    } else {
        raceInfo.fuel =  true;
    }
    //Damage
    if (document.getElementById("damageInput").value == 'false') {
        raceInfo.damage = false;
    } else {
        raceInfo.damage =  true;
    }
    //Tire Wear
    if (document.getElementById("tireWearInput").value == 'false') {
        raceInfo.tireWear = false;
    } else {
        raceInfo.tireWear =  true;
    }
    //Laps
    raceInfo.laps = parseInt(document.getElementById("lapsInput").value);

    findStartPosition();
    localStorage.setItem('startPosition', JSON.stringify(startPosition));
    localStorage.setItem('teams', JSON.stringify(teams));
    setStartingPositionAfterXRounds();
    calculateStartingTeamLeaderboard();
    localStorage.setItem('startTeamLB', JSON.stringify(calculateStartingTeamLeaderboard()));

    fullRotation();
}

function setStartingPositionAfterXRounds() {
    positionAfter.round10 = startPosition;
    positionAfter.round9 = startPosition;
    positionAfter.round8 = startPosition;
    positionAfter.round7 = startPosition;
    positionAfter.round6 = startPosition;
    positionAfter.round5 = startPosition;
    positionAfter.round4 = startPosition;
    positionAfter.round3 = startPosition;
    positionAfter.round2 = startPosition;
    positionAfter.round1 = startPosition;
}

setTimeout(function() {
    findStartPosition();
    setStartingPositionAfterXRounds();
}, 2000);

function calculatePositionAfter10Rounds() {
    for (let i = 10; i > 0; i--) {
        let round = "round" + i;
        let setRound = "round" + (i - 1);

        let positionAfterX = JSON.stringify(positionAfter[setRound]);

        if (setRound == "round0") {
            positionAfter[round] = currentPosition;
        } else {
            positionAfter[round] = JSON.parse(positionAfterX);
        }
    }

    localStorage.setItem('posAfter10', JSON.stringify(positionAfter.round10));
}

function caution(car, position, square) {
    let cautions = ["Your Car", "All In Row", "2 Ahead"];
    let abuse = [[90,0],[50,0],[25,25],[10,50]];

    let random = cautions[Math.floor(Math.random() * cautions.length)];
    console.log("Caution! Caused by: " + car + ", affecting: " + random + ".");

    function calculateRandomAbuse() {
        return abuse[Math.floor(Math.random() * abuse.length)];
    }

    if (random == "Your Car") {
        let randomAbuse = calculateRandomAbuse();

        bodyDamage[car] = bodyDamage[car] - randomAbuse[0];
        tires[car] = tires[car] - randomAbuse[1];
    } else if (random == "All In Row") {
        for (let i = 1; i <= 3; i++) {
            if (document.getElementById(convertCoordsToSquare(position[0], i)).classList.length != 0) {
                let theCar = document.getElementById(convertCoordsToSquare(position[0], i)).classList[0];

                let randomAbuse = calculateRandomAbuse();

                bodyDamage[theCar] = bodyDamage[theCar] - randomAbuse[0];
                tires[theCar] = tires[theCar] - randomAbuse[1];
            }
        }
    } else if (random == "2 Ahead") {
        let randomAbuse = calculateRandomAbuse();

        bodyDamage[car] = bodyDamage[car] - randomAbuse[0];
        tires[car] = tires[car] - randomAbuse[1];

        let coords = convertSquareToCoords(square);
        let newCoords = addXToCoords(coords, 1);
        if (document.getElementById(convertCoordsToSquare(newCoords)).classList.length != 0) {
            let theCar = document.getElementById(convertCoordsToSquare(newCoords)).classList[0];

            randomAbuse = calculateRandomAbuse();

            bodyDamage[theCar] = bodyDamage[theCar] - randomAbuse[0];
            tires[theCar] = tires[theCar] - randomAbuse[1];
        }

        newCoords = addXToCoords(coords, 2);
        if (document.getElementById(convertCoordsToSquare(newCoords)).classList.length != 0) {
            let theCar = document.getElementById(convertCoordsToSquare(newCoords)).classList[0];

            randomAbuse = calculateRandomAbuse();

            bodyDamage[theCar] = bodyDamage[theCar] - randomAbuse[0];
            tires[theCar] = tires[theCar] - randomAbuse[1];
        }
    }

    return 5;
}

setTimeout(function() {
    randomStart();
}, 2000);

function calculateTeamLeaderboard() {
    let LB = leaderBoard();

    teamLeaderboard["Car-ter"] = 0;
    teamLeaderboard["Hummerrrs"] = 0;
    teamLeaderboard["KirOOMMMM!"] = 0;
    teamLeaderboard["Jaden Motorsports"] = 0;
    teamLeaderboard["Chargers"] = 0;

    let i = 0;
    LB.forEach(function(car) {
        i++;
        teamLeaderboard[teams[car]] += 25 - (i - 1);
    });

    return teamLeaderboard;
}

function calculateStartingTeamLeaderboard() {
    let LB = leaderBoard();

    startingTeamLeaderboard["Car-ter"] = 0;
    startingTeamLeaderboard["Hummerrrs"] = 0;
    startingTeamLeaderboard["KirOOMMMM!"] = 0;
    startingTeamLeaderboard["Jaden Motorsports"] = 0;
    startingTeamLeaderboard["Chargers"] = 0;

    let i = 0;
    LB.forEach(function(car) {
        i++;
        startingTeamLeaderboard[teams[car]] += 25 - (i - 1);
    });

    return startingTeamLeaderboard;
}
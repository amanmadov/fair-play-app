class Player {
    constructor(name, skillLevel) {
        this.name = name;
        this.skillLevel = skillLevel;
    }
}

const playerListDiv = document.getElementById("playerList");
const btnAddPlayer = document.getElementById("btnAddPlayer");
const btnGetTeams = document.getElementById("btnGetTeams");
const team1Table = document.getElementById("table1");
const team2Table = document.getElementById("table2");
const outputTables = document.getElementById("outputTables");

let classNames = Array.from(btnGetTeams.classList);

// initial values
let playerCount = 1;
const team1 = [];
const team2 = [];
let totalSkillTeam1 = 0;
let totalSkillTeam2 = 0;


function addPlayerFields() {

    //#region Build InputGroup String
    const inputGroup = `<div class="row justify-content-md-center">
                            <div class="col col-md-6 col-sm-12">
                                <div class="input-group mb-6 p-1">
                                    <span class="input-group-text">${playerCount}</span>
                                    <input type="text" placeholder="Player Name" class="form-control"
                                        aria-label="Text input with dropdown button">
                                        <select class="form-select" aria-label="Default select example">
                                            <option value="default" selected>Player Skill Level</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                      </select>
                                </div>
                            </div>
                        </div>`;
    //#endregion

    //#region Append element to DOM 

    let row = document.createElement('div');
    row.innerHTML = inputGroup;
    row = row.firstChild;
    // playerListDiv.appendChild(row);
    playerListDiv.prepend(row);

    //#endregion

    playerCount++;
    if (playerCount >= 3 && classNames.includes('d-none')) btnGetTeams.classList.remove("d-none");

}

function validateInputs() {
    const inputs = document.querySelectorAll('input[type="text"]');
    const selects = document.querySelectorAll('select');

    // Check if all input fields are not empty
    for (const input of inputs) {
        if (input.value.trim() === '') return false;
    }

    // Check if all select elements have a selected value other than the default value
    for (const select of selects) {
        if (select.value === 'default') return false;
    }

    return true;
}

function getPlayers() {
    const playerElements = document.querySelectorAll('#playerList .input-group');
    const players = [];

    playerElements.forEach(playerElement => {
        const playerName = playerElement.querySelector('input[type="text"]').value;
        const level = parseInt(playerElement.querySelector('select').value);
        const player = new Player(playerName, level);
        players.push(player);
    });

    return players;
}

function distributeTeams(players) {
    players.sort((a, b) => b.skillLevel - a.skillLevel);
    // TODO: what if skills are: [3,3,4,10]
    // Count or Fairly distributed skills?
    for (let i = 0; i < players.length; i++) {
        const currentPlayer = players[i];
        if (totalSkillTeam1 <= totalSkillTeam2) {
            team1.push(currentPlayer);
            totalSkillTeam1 += currentPlayer.skillLevel;
        } else {
            team2.push(currentPlayer);
            totalSkillTeam2 += currentPlayer.skillLevel;
        }
    }
}

function fairlyDistribute(players) {
    // sort by skill level
    players.sort((a, b) => b.skillLevel - a.skillLevel);

    if (players.length % 2 === 0) {
        for (let i = 0; i < players.length; i++) {
            const currentPlayer = players[i];
            if (i % 2 === 0) {
                team1.push(currentPlayer);
                totalSkillTeam1 += currentPlayer.skillLevel;
            } else {
                team2.push(currentPlayer);
                totalSkillTeam2 += currentPlayer.skillLevel;
            }
        }
    } else {
        for (let i = 0; i < players.length - 1; i++) {
            const currentPlayer = players[i];
            if (i % 2 === 0) {
                team1.push(currentPlayer);
                totalSkillTeam1 += currentPlayer.skillLevel;
            } else {
                team2.push(currentPlayer);
                totalSkillTeam2 += currentPlayer.skillLevel;
            }
        }
        let lastPlayer = players[players.length - 1];
        team2.push(lastPlayer);
        totalSkillTeam2 += lastPlayer.skillLevel;
    }
}

function printTeams() {
    team1Table.innerHTML = generateTable(team1, totalSkillTeam1);
    team2Table.innerHTML = generateTable(team2, totalSkillTeam2);
}

function generateTable(team, skillTotal) {
    let rows = '';
    for (const [index, player] of team.entries()) {
        rows += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${player.name}</td>
                    <td>${player.skillLevel}</td>
                </tr>`;
    }

    let table = `<table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Player</th>
                            <th scope="col">Skill Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colspan="2"></td>
                        <td class="text-danger fw-bold">Total Skill: ${skillTotal}</td>
                    </tr>
                    
                  </tfoot>
                </table>`;
    return table;
}

function resetAll() {
    team1.length = 0;
    team2.length = 0;
    totalSkillTeam1 = 0;
    totalSkillTeam2 = 0;
    team1Table.innerHTML = '';
    team2Table.innerHTML = '';
}

function process() {
    resetAll();
    let areInputsValid = validateInputs();
    if (!areInputsValid) {
        var myModal = new bootstrap.Modal(document.getElementById('myModal'));
        myModal.show();
        return;
    }

    let playerList = getPlayers();
    let median = Math.floor(playerList.length / 2);
    let firstPart = playerList.slice(0, median);
    let secondPart = playerList.slice(median);

    const output = findPartitions(firstPart, secondPart);
    console.log({ output});
    const arr1 = output[0];
    const arr2 = output[1];
    // console.log({ firstPart, secondPart });
    console.log({ arr1, arr2 });

    for (const p of arr1) {
        team1.push(p);
        totalSkillTeam1 += p.skillLevel;
    }

    for (const p of arr2) {
        team2.push(p);
        totalSkillTeam2 += p.skillLevel;
    }


    // distributeTeams(playerList);
    // fairlyDistribute(playerList);
    printTeams();
    outputTables.scrollIntoView();
}




// Gets evenly distributed teams based on skill level
function findPartitions(arr1, arr2) {
    let diff = Math.abs(
        arr1.reduce((a, b) => a + b.skillLevel, 0) -
        arr2.reduce((a, b) => a + b.skillLevel, 0)
    );

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            let newDiff = Math.abs(
                arr1.reduce((a, b) => a + b.skillLevel, 0) - arr1[i].skillLevel + arr2[j].skillLevel -
                (arr2.reduce((a, b) => a + b.skillLevel, 0) - arr2[j].skillLevel + arr1[i].skillLevel)
            );
            if (newDiff < diff) {
                let temp1 = arr1[i];
                let temp2 = arr2[j];
                arr1[i] = temp2;
                arr2[j] = temp1;
                return findPartitions(arr1, arr2);
            }
        }
    }
    return [arr1, arr2];
}



btnAddPlayer.addEventListener("click", addPlayerFields);
btnGetTeams.addEventListener("click", process);
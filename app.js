let playerCounter = 1;

function addPlayerFields() {
    const playerList = document.getElementById("playerList");

    //#region InputGroup
    const inputGroup = `<div class="row justify-content-md-center">
                            <div class="col-6">
                                <div class="input-group mb-6 p-1">
                                    <span class="input-group-text">${playerCounter}</span>
                                    <input type="text" placeholder="Player Name" class="form-control"
                                        aria-label="Text input with dropdown button">
                                        <select class="form-select" aria-label="Default select example">
                                            <option selected>Player Skill Level</option>
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

    let row = document.createElement('div');
    row.innerHTML = inputGroup;
    row = row.firstChild;
    playerList.appendChild(row);
    // updateDropdownValue();
    playerCounter++;
}

function updateDropdownValue() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
    const dropdownButton = document.getElementById('btnSelect');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function () {
            const selectedValue = this.textContent;
            dropdownButton.textContent = selectedValue;
        });
    });
}




document.getElementById("btnAddPlayer").addEventListener("click", addPlayerFields);

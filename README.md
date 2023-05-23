# TeamBalancer

`TeamBalancer` is a Fair Team Distribution App developed using JavaScript that aims to create two equally balanced teams based on the skill levels of players. The app allows users to input player names and their corresponding skill levels, and then employs an algorithm to distribute the players into two teams.

The app follows a two-step process to achieve fair team distribution. First, it ensures that both teams have an **equal number** of players. This helps maintain a balanced playing field by preventing one team from having a numerical advantage over the other. Once the teams have an equal number of players, the app distributes the players based on their skill levels to ensure **fairness in terms of skill** distribution.

The `recursive` algorithm used in the app follows these steps:

<pre>
```javascript
// Gets evenly distributed teams based on skill level
// This is where all the magic happens
function balanceTeamsBySkillLevel(arr1, arr2) {
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
                return balanceTeamsBySkillLevel(arr1, arr2);
            }
        }
    }
    return [arr1, arr2];
}
```
</pre>


1. First, it calculates the initial difference between the total skill levels of the two teams.
2. Next, it iterates over each player in **Team 1**.
3. For each player in **Team 1**, it further iterates over each player in **Team 2**.
4. At each iteration, it calculates the new difference in skill levels if the players were to be swapped between the teams.
5. If the new difference is found to be smaller than the initial difference, it performs the swap between the two players.
6. After the swap, the function recursively calls itself with the updated teams.
7. Steps 2-6 are repeated until no further improvement can be achieved.
8. Finally, the function returns the balanced teams.

This recursive algorithm aims to find an optimal distribution of players between the two teams by iteratively swapping players to **minimize** the difference in skill levels. By recursively exploring all possible player swaps, it strives to achieve a fair balance between the teams based on their skill levels.

By providing a user-friendly interface with input fields for player names and skill levels, along with a distribution algorithm that prioritizes fairness, the `TeamBalancer` simplifies the process of creating balanced teams for various team-based activities, such as sports events, gaming competitions, or group projects.

<p ><strong><a href="https://amanmadov.github.io/fair-play-app">View Live Demo</a></strong></p>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the `TeamBalancer`, follow these instructions:

1. Download the project files: Obtain the project files from the source, either by downloading the zip file from a repository or cloning the project using Git.

2. Set up the project structure: Extract the downloaded zip file (if applicable) and navigate to the project folder.

3. Open the project in a code editor: Use a code editor of your choice (e.g., Visual Studio Code, Atom, Sublime Text) to open the project folder.

4. Set up a local development server (optional): If you want to run the app on a local development server, ensure you have a server environment set up. You can use tools like Node.js or Python's SimpleHTTPServer to serve the app locally. Alternatively, you can directly open the HTML file in a web browser without a local server.

5. Open the HTML file: Locate the HTML file (e.g., index.html) in the project folder and open it in a web browser or by launching the local development server.

6. Interact with the app: Once the app is open in the browser, you'll see the interface with options to add player names and skill levels. Use the **"Add Player"** button to enter the details for each player. The app will display the selected skill level when you choose it from the dropdown menu. Continue adding players until you have included all the participants.

7. Click the **"Get Teams"** button: After adding all the players, click the **"Get Teams"** button. The app will distribute the players into two teams, ensuring equal team sizes and fair skill distribution.

8. View the team results: The app will display the two teams with their respective player names and skill levels. You can observe how the algorithm has distributed the players to create balanced teams.

## Usage

Users can utilize the `TeamBalancer` by following these steps:

1. Access the App: Open the `TeamBalancer` in a web browser by entering the URL or launching the local development server where the app is hosted.

2. Add Player Details: On the app interface, users can see input fields for player names and select dropdowns for skill levels. They can click on the **"Add Player"** button to dynamically add more input fields for additional players.

## Features

The `TeamBalancer` is designed to help users distribute players into two teams in a fair and balanced manner. It offers the following key features and functionalities:

- [x] **Interactive Interface**
The app provides a user-friendly interface where users can easily input player details and interact with various elements.

- [x] **Add Players**
Users can dynamically add players by clicking the **"Add Player"** button. This feature allows them to include any number of players for team distribution.

- [x] **Select Skill Levels**
For each player, users can choose the skill level from a dropdown menu. The skill levels range from **1** to **10**, allowing users to assign appropriate skill levels to the players.


## Screenshots

<p align="center"><img src="https://amanmadov.github.io/fair-play-app/images/initial.png"></p>
<br>
<p align="center"><img src="https://amanmadov.github.io/fair-play-app/images/output.png"></p>


## Contributing

Thank you for your interest in contributing to the `TeamBalancer`! We welcome contributions from the community to help improve and enhance the functionality of the app. Your contributions will be greatly valued in improving the `TeamBalancer`.

**Note: By contributing to the project, you agree to abide by the project's code of conduct.**

## License

The `TeamBalancer` is released under the MIT License.



<!-- CONTACT -->
## Contact

Nury Amanmadov - [@amanmadov](https://twitter.com/amanmadov) - amanmadov@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>

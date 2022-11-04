// <!-- Coding Steps:
// Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
// Use at least one array.
// Use at least two classes.
// Your menu should have the options to create, view, and delete elements. -->


class Pokemon {
    constructor(name, power){
        this.name = name;
        this.power = power;
    }

    describe() {
        return `${this.name} has ${this.power}.`;
    }
}
    class Team {
        constructor (name) {
            this.name = name;
            this.players = [];
        }
    
        addPokemon (pokemon) {
            if (pokemon instanceof Pokemon){
                this.players.push(pokemon);
            } else {
                throw new Error (`You can only add an instance of Pokemon. Argument is not a pokemon: ${pokemon}`);
            }
        }

        describe() {
            return `${this.name} has ${this.players.length} pokemon.`;
        }
    }

    class Menu {
        constructor() {
            this.teams = [];
            this.selectedTeam = null;
        }

        start() {
            let selection = this.showMainMenuOptions();

            while (selection !=0) {
                switch (selection) {
                    case '1':
                        this.createTeam();
                        break;
                    case '2':
                        this.viewTeam();
                        break;
                    case '3':
                        this.deleteTeam();
                        break;
                    case '4':
                        this.displayTeams();
                        break;
                        default:
                            selection = 0; 
                }
                selection = this.showMainMenuOptions();
            } 
            alert ('Go catch more pokemon!');
        }

        showMainMenuOptions() {
            return prompt (`
            0) exit
            1) create new team
            2) view team
            3) delete team
            4) display all teams
            `);
        }
        
        showTeamMenuOptions(teamInfo) {
            return prompt (`
            0) back
            1) create pokemon
            2) delete pokemon
            --------------------------
            ${teamInfo}
            `);
        }

        displayTeams() {
            let teamString = '';
            for (let i = 0; i < this.teams.length; i++) {
                teamString += i + ') ' + this.teams[i].name + '\n';
            }
            alert(teamString);
        }

        createTeam() {
            let name = prompt ('Enter name for new team:');
            this.teams.push (new Team(name));
        }

        viewTeam() {
            let index = prompt ('Enter the index of the team you wish to view: ');
            if (index > -1 && index < this.teams.length) {
                this.selectedTeam = this.teams[index];
                let description = 'Team Name: ' + this.selectedTeam.name + '\n';

                for (let i = 0; i < this.selectedTeam.players.length; i++) {
                    description += i + ') ' + this.selectedTeam.players[i].name + ' - ' + this.selectedTeam.players[i].power + '\n';
                }

                let selection = this.showTeamMenuOptions(description);
                switch (selection) {
                    case '1':
                        this.createPokemon();
                        break;
                    case '2':
                        this.deletePokemon();
                }
            }  
        }

        deleteTeam() {
            let index = prompt('Enter the index of the team you wish to delete:');
            if (index > -1 && index  < this.teams.length) {
                this.teams.splice(index, 1);
            }
        }

        createPokemon(){
            let name = prompt ('Enter name for new pokemon:');
            let power = prompt ('Enter the power for the new pokemon:');
            this.selectedTeam.players.push(new Pokemon(name, power));
        }
       
        deletePokemon(){
            let index = prompt('Enter the index of the pokemon you wish to delete:');
            if (index > -1 && index < this.selectedTeam.players.length){
               this.selectedTeam.players.splice(index, 1); 
            }
        }
      
        }

        let menu = new Menu();
        menu.start();

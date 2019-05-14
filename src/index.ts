import Player from './Player';
class GooseGame {
    private players: Array<Player> = [];
    private message: string = "";
    
    private lastSpace: number = 63;
    private bridgeSpace: number = 6;
    private gooseSpace: Array<number> = [5, 9, 14, 18, 23, 27];
    constructor() {
        this.help();
    };

    addPlayer(name: string): string{
        //const player = new Player(name);
        const existingName: boolean = this.players.filter(p => p.name === name).length >= 1;
        if (existingName) {
            return `${name}: already existing player`;
        } else {
            this.players.push(new Player(name))
            return `players: ${this.getPlayers()}`;
        }
        
    }
    getPlayers() {
        return this.players.map(p => p.name).join(', ');
    }

    move(name: string, ...moves:Array<number>): string {
        //ToDo: add error handling
        if (moves.length === 0) {
            moves = this.randomDiceRoll();
        } 
        let player = this.players.filter(p => p.name === name)[0]
        
        if (player && !player.hasFinished) {
            this.message = `${name} rolls ${moves.join(', ')}. ${name} moves from ${player.currentSpace} to `;
            this.checkScenarios(player, moves);
            this.moveOtherPlayers(player);
            return this.message;
        } 

        if (player && player.hasFinished) {
            return this.message = `cannot move ${player.name}! ${player.name} already finished!`;
        }

        return this.message = `invalid name. Try: ${this.getPlayers()}`;

    }
    randomDiceRoll():Array<number> {
        return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1 ]
    }

    checkScenarios(player: Player, moves: Array<number>) {
        const prev = player.currentSpace;
        const diceSum = moves.reduce((acc, item) => acc + item, 0);
        const currentSpace = player.currentSpace + diceSum;
        switch (true) {
            case (currentSpace === this.bridgeSpace):                
                this.message += `The Bridge. ${player.name} jumps to 12`;
                player.previousSpaces.unshift(prev);
                player.currentSpace = 12;
                break;
            case (this.gooseSpace.includes(currentSpace)):
                this.message += `${currentSpace}, the Goose. ${player.name} moves again and goes to `
                player.currentSpace = currentSpace;
                player.previousSpaces.unshift(prev);
                this.checkScenarios(player, moves);
                this.moveOtherPlayers(player);
            break;
            case (currentSpace > this.lastSpace):
                const rollback = this.lastSpace - (currentSpace - this.lastSpace));
                this.message += `${this.lastSpace}. ${player.name} bounces! ${player.name} returns to ${rollback}`
                player.currentSpace = rollback;
            break;
            case (currentSpace === this.lastSpace):
                player.currentSpace = currentSpace;
                player.previousSpaces.unshift(prev);
                this.message += `${currentSpace}. ${player.name} Wins!!!`
                player.hasFinished = true;
            break;
            default:
                this.message += `${currentSpace}`;
                player.currentSpace = currentSpace;
                player.previousSpaces.unshift(prev);
                break;
        }
        
    }

    moveOtherPlayers(player: Player):void {
        if (player.currentSpace !== this.lastSpace && player.currentSpace !== 0) {
            const curr = player.currentSpace;
            const name = player.name
            const occupant = this.players.filter(p => (p.currentSpace === curr && p.name !== name))[0]
            if (occupant) {
                occupant.currentSpace = occupant.previousSpaces[0];
                occupant.previousSpaces.shift();
                this.message += `. On ${curr} there is ${occupant.name}, who returns to ${occupant.currentSpace}`
                this.moveOtherPlayers(occupant);
            }
        } 
    }

    help() {
        console.group('list of all available methods');
        console.log('game.addPlayer(playerName)')
        console.log('game.move(player, dice1, dice2)')
        console.groupEnd('list of all available methods');
    }

}

window.game = new GooseGame();

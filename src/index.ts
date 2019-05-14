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

    addPlayer(name: string): void{
        //const player = new Player(name);
        const existingName: boolean = this.players.filter(p => p.name === name).length >= 1;
        if (existingName) {
            console.log(`${name}: already existing player`)
        } else {
            this.players.push(new Player(name))
            console.log(`players: ${this.getPlayers()}`)
        }
        
    }
    getPlayers() {
        return this.players.map(p => p.name).join(', ');
    }

    move(name: string, ...moves:Array<number>): void {
        //ToDo: add error handling
        if (moves.length === 0) {
            moves = this.randomDiceRoll();
        } 
        let player = this.players.filter(p => p.name === name)[0]
        this.message = `${name} rolls ${moves.join(', ')}. ${name} moves from ${player.currentSpace} to `;
        if (player) {
            this.checkScenarios(player, moves);
            console.log(this.message);
        } else {
            console.log(`invalid name. Try: ${this.getPlayers()}`)
        }
    }
    randomDiceRoll():Array<number> {
        return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1 ]
    }

    checkScenarios(player: Player, moves: Array<number>) {
        player.previousSpace = player.currentSpace;
        const name = player.name;
        const prev = player.previousSpace;
        const diceSum = moves.reduce((acc, item) => acc + item, 0);
        const currentSpace = player.currentSpace + diceSum;
        switch (true) {
            case (currentSpace === this.bridgeSpace):                
                this.message += `The Bridge. ${player.name} jumps to 12`;
                player.currentSpace = 12;
                break;
            case (this.gooseSpace.includes(currentSpace)):
                this.message += `${currentSpace}, the Goose. ${player.name} moves again and goes to `
                player.currentSpace = currentSpace;
                this.checkScenarios(player, moves);
            break;
            case (currentSpace > this.lastSpace):
                const rollback = this.lastSpace - (currentSpace - this.lastSpace));
                this.message += `${this.lastSpace}. ${player.name} bounces! ${player.name} returns to ${rollback}`
                player.currentSpace = rollback;
            break;
            case (currentSpace === this.lastSpace):
                player.currentSpace = currentSpace;
                this.message += `${currentSpace}. ${player.name} Wins!!!`
            break;
            default:
                this.message += `${currentSpace}`;
                player.currentSpace = currentSpace;
                break;
        }
        
    }

    help() {
        console.group('list of all available methods');
        console.log('game.addPlayer(playerName)')
        console.log('game.move(player, [dice1, dice2])')
        console.groupEnd('list of all available methods');
    }

}

window.game = new GooseGame();

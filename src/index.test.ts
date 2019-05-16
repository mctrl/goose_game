import {GooseGame} from './index';


    
describe('Goose Game Class', () => {
    let game
    // beforeAll(() => { 
        
    //     game = new GooseGame();
    // })

    it('initialise correctly', () => {
        game = new GooseGame();
        expect(game).toBeInstanceOf(GooseGame);
    })

    it("getPlayer() returns list of players", () => {
        game = new GooseGame();
        game.players = [
            {currentSpace: 0, previousSpaces: [], hasFinished: false, name: "Pluto"},
            {currentSpace: 0, previousSpaces: [], hasFinished: false, name: "Minnie"}
        ]
        const result = game.getPlayers();
        expect(result).toBe("Pluto, Minnie")
    })

    it('randomDiceRoll() returns array of 2', () => {
        game = new GooseGame();
        const result = game.randomDiceRoll();
        expect(result).toHaveLength(2);
    })

    it('randomDiceRoll() is called if moves are not provided', () => {
        game = new GooseGame();
        game.randomDiceRoll = jest.fn();
        game.players = [{currentSpace: 0, previousSpaces: [], hasFinished: true, name: "Pluto"}]
        game.move('Pluto');
        expect(game.randomDiceRoll).toHaveBeenCalled();
    })

    it('randomDiceRoll() is NOT called if moves ARE provided', () => {
        game = new GooseGame();
        game.randomDiceRoll = jest.fn();
        game.players = [{currentSpace: 0, previousSpaces: [], hasFinished: true, name: "Pluto"}]
        game.move('Pluto', 4, 4);
        expect(game.randomDiceRoll).not.toBeCalled();
    })

    it('Add player', () => {
        game = new GooseGame();
        var result = game.addPlayer('Pluto');
        expect(result).toBe('players: Pluto')
    })

    it('Errors when trying to add already existing players', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 0, previousSpaces: [], hasFinished: false, name: "Pluto"}]
        var result = game.addPlayer('Pluto');
        expect(result).toBe('Pluto: already existing player')
    })

    it('moves existing player', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 0, previousSpaces: [], hasFinished: false, name: "Pluto"}]
        const result = game.move('Pluto', 4, 4);
        expect(result).toBe('Pluto rolls 4, 4. Pluto moves from 0 to 8')
    })

    it('does not move playes who finished the game', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 0, previousSpaces: [], hasFinished: true, name: "Pluto"}]
        const result = game.move('Pluto', 4, 4);
        expect(result).toBe('cannot move Pluto! Pluto already finished!')
    })

    it('errors when trying to move unexisting players', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 0, previousSpaces: [], hasFinished: true, name: "Pluto"}]
        const result = game.move('Minnie', 4, 4);
        expect(result).toBe('invalid name. Try: Pluto')
    })

    it('errors when trying to move unexisting players', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 0, previousSpaces: [], hasFinished: true, name: "Pluto"}]
        const result = game.move('Minnie', 4, 4);
        expect(result).toBe('invalid name. Try: Pluto')
    })

    it('moveOtherPlayers() player is not at extemity of game but occupant is not found', () => {
        game = new GooseGame();
        game.moveOtherPlayers = jest.fn();
        game.players = [{currentSpace: 0, previousSpaces: [], hasFinished: false, name: "Pluto"}]
        game.move('Pluto', 4, 4);
        expect(game.moveOtherPlayers).toBeCalled();

    })

    it('Bridge scenario', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 0, previousSpaces: [], hasFinished: false, name: "Pluto"}]
        const result = game.move('Pluto', 4, 2);
        expect(result).toBe('Pluto rolls 4, 2. Pluto moves from 0 to The Bridge. Pluto jumps to 12')
    })
     
    it('Player Wins', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 61, previousSpaces: [0, 12], hasFinished: false, name: "Pluto"}]
        const result = game.move('Pluto', 1, 1);
        expect(result).toBe('Pluto rolls 1, 1. Pluto moves from 61 to 63. Pluto Wins!!!')
    })

    it('Player bounces back', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 61, previousSpaces: [0, 12], hasFinished: false, name: "Pluto"}]
        const result = game.move('Pluto', 2, 1);
        expect(result).toBe('Pluto rolls 2, 1. Pluto moves from 61 to 63. Pluto bounces! Pluto returns to 62')
    })

    it('Goose step single move', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 7, previousSpaces: [0, 5], hasFinished: false, name: "Pluto"}]
        const result = game.move('Pluto', 1, 1);
        expect(result).toBe('Pluto rolls 1, 1. Pluto moves from 7 to 9, the Goose. Pluto moves again and goes to 11')
    })

    it('Goose step double move', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 1, previousSpaces: [0], hasFinished: false, name: "Pluto"}]
        const result = game.move('Pluto', 2, 2);
        expect(result).toBe('Pluto rolls 2, 2. Pluto moves from 1 to 5, the Goose. Pluto moves again and goes to 9, the Goose. Pluto moves again and goes to 13')
    })

    it('Player lands on occupied space', () => {
        game = new GooseGame();
        game.players = [
            {currentSpace: 0, previousSpaces: [0], hasFinished: false, name: "Pluto"}
            {currentSpace: 4, previousSpaces: [0], hasFinished: false, name: "Minnie"}
        ]
        const result = game.move('Pluto', 2, 2);
        expect(result).toBe('Pluto rolls 2, 2. Pluto moves from 0 to 4. On 4 there is Minnie, who returns to 0')
    })

    it('Doesnt updates previous space when player bounces back', () => {
        game = new GooseGame();
        game.players = [{currentSpace: 61, previousSpaces: [0, 12], hasFinished: false, name: "Pluto"}]
        const result = game.move('Pluto', 5, 5);
        expect(result).toBe('Pluto rolls 5, 5. Pluto moves from 61 to 63. Pluto bounces! Pluto returns to 55')

    })
 //tobe called with [{"currentSpace": 8, "hasFinished": false, "name": "Pluto", "previousSpaces": [0]}]
})

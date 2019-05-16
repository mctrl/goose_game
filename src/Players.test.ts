import Player from './Player';

describe('Player class', () => {
    it('gets initialised name correctly', () => {
        const player = new Player('Pluto');
        expect(player.name).toBe('Pluto');
    })

    it('Player starts from position 0', () => {
        const player = new Player('Pluto');
        expect(player.currentSpace).toBe(0);
    })
})
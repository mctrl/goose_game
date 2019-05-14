interface IPlayer {
    name: string,
    currentSpace: number,
    previousSpaces: Array<number>,
    hasFinished: boolean
}
export default class Player implements IPlayer {
    public currentSpace: number = 0;
    public previousSpaces: Array<number> = [];
    public name: string;
    hasFinished: boolean = false;
    constructor(name: string){
        this.name = name;
    }


    
}
interface IPlayer {
    name: string,
    currentSpace: number,
    previousSpace: number
}
export default class Player implements IPlayer {
    public currentSpace: number = 0;
    public previousSpace: number = 0;
    name: string;
    constructor(name: string){
        this.name = name;
    }


    
}
export class Beacon {
    public id: string;
    public createdAt: string;
    public moduleName: string;
    public beaconId: number;
    public x: number;
    public y: number;

    constructor(init?: Partial<Beacon>) {
        Object.assign(this, init);
    }
}

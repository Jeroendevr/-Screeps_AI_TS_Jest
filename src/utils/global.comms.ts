// Global communication class

export class Comms {
    private static _instance: Comms;

    // Singleton
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    wanted_resource_energy: number = 0;

    more_resource(RESOURCE: ResourceConstant): void {
        switch (RESOURCE) {
            case 'energy':
                this.wanted_resource_energy += 1;
            default:
                console.log('Cannot handle more resource of ${expr}.')
        }

    }
}

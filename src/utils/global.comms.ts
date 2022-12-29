// Global communication class


import { RoomManager } from "manager/manager";

class Comms {
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

class RoomComms extends RoomManager {
    static _construction_sites :[RoomPosition, BuildableStructureConstant][] = [];

    add_constrution_site(pos: RoomPosition, building: BuildableStructureConstant){
        RoomComms._construction_sites.push([pos, building])

    }

    get construction_sites() {
        return RoomComms._construction_sites
    }
}

export {
    Comms,
    RoomComms,
}

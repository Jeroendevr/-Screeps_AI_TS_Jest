// Global communication class


import { RoomManager } from "manager/manager";
import { Transform } from "stream";

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
    static _construction_site_wanted: boolean = false

    add_constrution_site(pos: RoomPosition, building: BuildableStructureConstant){
        RoomComms._construction_sites.push([pos, building])

    }

    get construction_sites() {
        return RoomComms._construction_sites
    }

    set constriction_sites_wanted(yn: boolean) {
        RoomComms._construction_site_wanted = yn
    }


}

export {
    Comms,
    RoomComms,
}

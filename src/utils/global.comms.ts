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

type SiteLocationBuilding = [number, number, BuildableStructureConstant];

class RoomComms extends RoomManager {
    construction_sites :SiteLocationBuilding[] = [];

    add_constrution_site(SITE: SiteLocationBuilding){
        this.construction_sites.push(SITE)

    }
}

export {
    Comms,
    RoomComms,
    SiteLocationBuilding
}

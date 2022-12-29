import { mockGlobal, mockInstanceOf } from "screeps-jest"
import { RoomComms } from "utils/global.comms"
import { SiteLocationBuilding } from "utils/global.comms"


const MyRoom = mockInstanceOf<Room>()
const MyGame = mockGlobal<Game>('Game', {
    rooms: {
        'A1A1':MyRoom
    }
})

describe('RoomComs', () => {
    it('extend the RoomManager, pass constructor arg withouth defining the constructor', () => {
        mockGlobal<Game>('Game', {
            rooms: {
                'A1A1':MyRoom
            }
        })
        const RC = new RoomComms('A1A1')
        expect(RC).toBeInstanceOf(RoomComms)
    })
    it('adds a construction site', () => {
        MyGame
        const RC = new RoomComms('A1A1');
        const site :SiteLocationBuilding = [0,0, STRUCTURE_ROAD]

        RC.add_constrution_site(site);
        expect(RC.construction_sites[0]).toBe(site)
    })
})

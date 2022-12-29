import { mockGlobal, mockInstanceOf } from "screeps-jest"
import { mockRoomPositionConstructor } from "screeps-jest/dist/src/mocking"
import { RoomComms } from "utils/global.comms"


const MyRoom = mockInstanceOf<Room>()
const MyGame = mockGlobal<Game>('Game', {
    rooms: {
        'A1A1':MyRoom
    }
})
mockRoomPositionConstructor(global);
const MyRoomPos = mockInstanceOf<RoomPosition>( {
    x: 1,
    y: 1
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

        RC.add_constrution_site(MyRoomPos,STRUCTURE_ROAD );
        expect(RC.construction_sites[0]).toStrictEqual([{x: 1, y: 1}, "road"])
    })
})

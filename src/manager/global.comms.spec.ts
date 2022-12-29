import { mockGlobal, mockInstanceOf } from "screeps-jest"
import { RoomComms } from "utils/global.comms"


const MyRoom = mockInstanceOf<Room>()

describe('RoomComs', () => {
    it('extend the RoomManager, pass constructor arg withouth defining the constructor', () => {
        mockGlobal<Game>('Game', {
            rooms: {
                'A1A1':MyRoom
            }
        })
        const RC = new RoomComms('A1A1')
    })
})

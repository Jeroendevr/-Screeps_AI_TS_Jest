import { Comms } from "./global.comms";



const comms = new Comms()

describe('Global communication', () => {
    it('more energy', () => {
        comms.more_resource('energy')
        expect(comms.wanted_resource_energy).toEqual(1)

    })
})

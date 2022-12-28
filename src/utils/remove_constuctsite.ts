class RemoveConstructionSite {
    constructor (public room_name: string) {
        console.log('Removing construction sites')
    }

    run() {
        const construction_sites = Game.rooms[this.room_name].find(FIND_MY_CONSTRUCTION_SITES)

        for (const j in construction_sites) {
            construction_sites[j].remove()
        }
    }
}

export {
    RemoveConstructionSite
}

class RoomManager {
    constructor (public room_name: string) {
        if  (!(room_name in Game.rooms)) {
            throw new Error("Roomname does not exits")}
        }
        room :Room = Game.rooms[this.room_name];
}

export {
    RoomManager
}

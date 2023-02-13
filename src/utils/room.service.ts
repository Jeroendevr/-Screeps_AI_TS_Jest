class RoomService {
  constructor(public room: Room) {}

  sources(): Source[] {
    return this.room.find(FIND_SOURCES);
  }
}

export { RoomService };

class TowerVisual {
  pos: any;
  room: any;
  constructor(tower: StructureTower) {
    this.pos = tower.pos;
    this.room = tower.room;
  }

  visualize() {
    this.energy_lvl();
  }

  energy_lvl() {
    new RoomVisual(this.room).text("Tower energy levels", this.pos);
  }
}

export { TowerVisual };

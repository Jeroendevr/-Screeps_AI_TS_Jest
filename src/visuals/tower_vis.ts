/**
 * Should not accept a tower as argument but loop through all ID
 */

class TowerVisual {
  towers: Id<StructureTower>[] = [];

  constructor() {
    Object.values(Game.rooms).forEach(room => {
      if (room.controller?.my) {
        const towers = room.find<StructureTower>(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
        towers.forEach(tower => {
          this.towers.push(tower.id);
        });
      }
    });
  }

  /**
   * For each tower Id create a tower instance
   */
  visualize() {
    this.towers.forEach(towerId => {
      this.energy_lvl_update(towerId);
      this.energy_lvl_vis(towerId);
    });
  }

  energy_lvl_update(towerId: Id<StructureTower>) {
    //
  }
  energy_lvl_vis(towerId: Id<StructureTower>) {
    // new RoomVisual(this.room.name).text("Tower ⚡️ levels " + this.avg_energy_lvl, this.pos, { font: 0.5 });
  }
}

export { TowerVisual };

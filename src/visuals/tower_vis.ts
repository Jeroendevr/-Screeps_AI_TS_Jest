/**
 * Should not accept a tower as argument but loop through all ID
 */

class TowerVisual {
  towers_id: Id<StructureTower>[] = [];
  towers: StructureTower[] = [];

  add_towers(towers: StructureTower[]) {
    this.towers = towers;
  }

  /**
   * For each tower Id create a tower instance
   */
  visualize() {
    this.towers_id.forEach(towerId => {
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

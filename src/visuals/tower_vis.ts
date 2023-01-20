/**
 * Should not accept a tower as argument but loop through all ID
 */

class TowerVisual {
  towers_id: Id<StructureTower>[] = [];
  towers: StructureTower[] = [];
  towers_stats: Map<Id<StructureTower>, TowerStats> = new Map();

  add_towers(towers: StructureTower[]) {
    this.towers = towers;
  }

  /**
   * For each tower Id create a tower instance
   */
  visualize() {
    this.towers.forEach(tower => {
      this.energy_lvl_update(tower);
      this.energy_lvl_vis(tower);
    });
  }

  energy_lvl_update(tower: StructureTower) {
    this.towers_stats.set(tower.id, { energy_lvl: 5 });
  }

  energy_lvl_vis(tower: StructureTower) {
    new RoomVisual(tower.room.name).text("Tower ⚡️ levels " + this.towers_stats.get(tower.id)?.energy_lvl, tower.pos, {
      font: 0.5
    });
  }

  tower_from_id() {
    const game_struct_val = Object.values(Game.structures);

    console.log();
  }
}

interface TowerStats {
  energy_lvl: number;
}

export { TowerVisual };

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
    const energy_storage = tower.store[RESOURCE_ENERGY];
    const measure_point = this.measurement_points(tower) + 1;
    const total_energy = this.total_energy_lvl(tower) + energy_storage;
    const avg_energy_lvl = total_energy / measure_point;
    console.log(total_energy + " " + energy_storage + " " + measure_point);
    this.towers_stats.set(tower.id, {
      avg_energy_lvl: avg_energy_lvl,
      total_energy: total_energy,
      measure_point: measure_point
    });
  }

  measurement_points(tower: StructureTower): number {
    const stat_val = this.towers_stats.get(tower.id);
    if (stat_val?.measure_point != undefined) return stat_val.measure_point;
    return 1;
  }

  avg_energy_lvl(tower: StructureTower): number {
    const stat_val = this.towers_stats.get(tower.id);
    if (stat_val?.avg_energy_lvl != undefined) return stat_val.avg_energy_lvl;
    return 0;
  }

  total_energy_lvl(tower: StructureTower): number {
    const stat_val = this.towers_stats.get(tower.id);
    if (stat_val?.total_energy != undefined) return stat_val.total_energy;
    return tower.store[RESOURCE_ENERGY];
  }

  energy_lvl_vis(tower: StructureTower) {
    const x_pos = tower.pos.x;
    const y_pos = tower.pos.y - 1;
    new RoomVisual(tower.room.name).text(
      "Tower ⚡️ levels " + this.towers_stats.get(tower.id)?.avg_energy_lvl,
      x_pos,
      y_pos,
      {
        font: 0.5,
        color: "#6C99BB",
        backgroundColor: "#372725"
      }
    );
  }
}

interface TowerStats {
  avg_energy_lvl: number;
  total_energy: number;
  measure_point: number;
}

export { TowerVisual };

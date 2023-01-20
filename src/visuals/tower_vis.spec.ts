import { mockStructure } from "screeps-jest";
import { TowerVisual } from "./tower_vis";

const myTower = mockStructure(STRUCTURE_TOWER, {
  pos: undefined,
  room: undefined,
  id: "007",
  store: {
    energy: 50
  }
});

describe("Tower Visuals", () => {
  it("calculate energy level", () => {
    const tower_vis = new TowerVisual();
    tower_vis.energy_lvl_update(myTower);
    const stats = tower_vis.towers_stats.get(myTower.id);
    expect(stats?.avg_energy_lvl).toBe(50);
  });
});

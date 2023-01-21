import { InfraManager2 } from "manager/manager.infra2";
import { spawnManager, spawnAmount } from "manager/manager.spawn";
import { Builder, roleBuilder } from "roles/builder";
import { BuilderClass, BuilderRole } from "roles/builderv2";
import { Harvester, roleHarvester } from "roles/harvester";
import { RemoveConstructionSite } from "utils/remove_constuctsite";
import { Koerier, roleKoerier } from "roles/koerier";
import roleUpgrader, { Upgrader } from "roles/upgrader";
import ErrorMapper from "utils/ErrorMapper";
import { runTower } from "./tower";
import { TowerVisual } from "visuals/tower_vis";
import { ConstructionManager } from "manager/manager.construction";

declare global {
  interface CreepMemory {
    role: string;
  }
}

function unwrappedLoop(): void {
  // console.log(`Current game tick is ${Game.time}`);
  cleanMemory();
  runAllTowers();
  runCreep();
  spawnManager.run();
  run_owned_rooms();
  tower_vis.visualize();
  // Util section
  // run_nonstandard_utils()
}

function cleanMemory(): void {
  // Automatically delete memory of missing creeps
  Object.keys(Memory.creeps)
    .filter(name => !(name in Game.creeps))
    .forEach(name => delete Memory.creeps[name]);
}

function run_owned_rooms(): void {
  for (const room_name in Game.rooms) {
    if (Game.rooms[room_name].controller?.my == true) {
      new InfraManager2(room_name).run();
      new ConstructionManager(room_name).run();
      new spawnAmount().update_based_on_room(room_name);
    }
  }
}

function runAllTowers(): void {
  Object.values(Game.rooms).forEach(room => {
    if (room.controller?.my) {
      const towers = room.find<StructureTower>(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
      tower_vis.add_towers(towers);

      towers.forEach(tower => {
        runTower(tower);
      });
    }
  });
}

function runCreep(): void {
  /**
   * Init the classes
   */

  Object.values(Game.creeps).forEach(creep => {
    if (creep.memory.role === "harvester") {
      roleHarvester.run(creep as Harvester);
    }
    if (creep.memory.role === "upgrader") {
      roleUpgrader.run(creep as Upgrader);
    }
    if (creep.memory.role === "builder") {
      try {
        roleBuilder.run(creep as Builder);
        const Builder = new BuilderClass();
        Builder.run(creep as BuilderRole);
      } catch (error) {
        console.log(creep.memory.role + error);
      }
    }
    if (creep.memory.role === "koerier") {
      roleKoerier.run(creep as Koerier);
    }
  });
}

const tower_vis = new TowerVisual();

function run_nonstandard_utils() {
  //Mostly run once
  new RemoveConstructionSite("E3S34").run();
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
const loop = ErrorMapper.wrapLoop(unwrappedLoop);

export { loop, cleanMemory, runCreep, runAllTowers };

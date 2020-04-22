import { ErrorMapper } from "utils/ErrorMapper";
import { spawnCreep } from "spawnCreep";
import { defend } from "defend";
import { transferEnergy } from "transferEnergy";
import { roleHarvester } from "role.harvester";
import { roleUpgrader } from "role.upgrader";
import { roleSpecial } from "role.special";
import { roleRepair } from "role.repair";
import { roleTransfer } from "role.transfer";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName];
    const room = spawn.room;

    if (room.controller) {
      room.controller.activateSafeMode();

      defend(room);

      transferEnergy(room);

      const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
      const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
      const specials = _.filter(Game.creeps, (creep) => creep.memory.role == 'special');
      const repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
      const transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');

      const sites = room.find(FIND_CONSTRUCTION_SITES);

      if (transfers.length < 1) {
        var newName = 'Transfer' + Game.time;
        console.log('Spawning new transfer: ' + newName);
        spawnCreep('transfer', newName, room, spawn);
      } else if (harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        spawnCreep('harvester', newName, room, spawn);
      } else if (specials.length < 1) {
        var newName = 'Special' + Game.time;
        console.log('Spawning new special: ' + newName);
        spawnCreep('special', newName, room, spawn);
      } else if (repairs.length < 1) {
        var newName = 'Repair' + Game.time;
        console.log('Spawning new repair: ' + newName);
        spawnCreep('repair', newName, room, spawn);
      } else if (upgraders.length < 3) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        spawnCreep('upgrader', newName, room, spawn);
      }

      if (spawn.spawning) {
        var spawningCreep = Game.creeps[spawn.spawning.name];
        room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          spawn.pos.x + 1,
          spawn.pos.y,
          { align: 'left', opacity: 0.8 });
      }

      for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
          roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
          roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'special') {
          roleSpecial.run(creep, room);
        }
        if (creep.memory.role == 'repair') {
          roleRepair.run(creep);
        }
        if (creep.memory.role == 'transfer') {
          roleTransfer.run(creep, room);
        }
      }
    }
  }
});

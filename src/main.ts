import { ErrorMapper } from "utils/ErrorMapper";
import { manageCreeps } from "manageCreeps";
import { defend } from "defend";
import { transferEnergy } from "transferEnergy";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName];
    const room = spawn.room;

    // if (room.name === 'E12N45') {
    //   if (Game.time % 10 === 0) {
    //     console.log(spawn.room.controller?.progress + '/' + spawn.room.controller?.progressTotal);
    //   }
    // }

    if (room.controller) {
      // room.controller.activateSafeMode();

      // defend(room);

      // transferEnergy(room);

      manageCreeps(spawn);
    }
  }
});

import { ErrorMapper } from "utils/ErrorMapper";
import { manageCreeps } from "manageCreeps";
import { manageTowers } from "manageTowers";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  Object.values(Game.rooms).forEach((room) => {
    manageCreeps(room);

    manageTowers(room);
  });

  Object.values(Game.spawns).forEach((spawn) => {
    const hostileCreeps = spawn.room.find(FIND_HOSTILE_CREEPS);

    if (hostileCreeps.length === 0) {
      const creep = spawn.pos.findInRange(FIND_CREEPS, 1, {
        filter: c => c.getActiveBodyparts(ATTACK) > 0
      })[0];

      if (creep) {
        spawn.recycleCreep(creep);
      }
    }
  });
});

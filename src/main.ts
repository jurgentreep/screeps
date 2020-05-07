import { ErrorMapper } from "utils/ErrorMapper";
import { manageCreeps } from "manageCreeps";

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
  })
});

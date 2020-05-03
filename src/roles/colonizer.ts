export const roleColonizer = (creep: Creep) => {
  if (Game.flags.colonize.room && creep.room.name === Game.flags.colonize.room.name) {
    const controller = creep.room.controller;

    if (controller) {
      const result = creep.claimController(controller);

      if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ffff' } });
      } else {
        creep.moveTo(25, 25);
        if (Game.time % 10 === 0) {
          console.log(result);
        }
      }
    } else {
      console.log('no controller found');
    }
  } else {
    creep.moveTo(Game.flags.colonize.pos, { visualizePathStyle: { stroke: '#00ffff' } });
  }
}

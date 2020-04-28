export const roleColonizer = (creep: Creep) => {
  const roomName = 'E12N46';

  if (creep.room.name === roomName) {
    const controller = creep.room.controller;

    if (controller) {
      const result = creep.attackController(controller);

      if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ffff' } });
      } else {
        if (Game.time % 10 === 0) {
          console.log(result);
        }
      }
    } else {
      console.log('no controller found');
    }
  } else {
    creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#00ffff' } });
  }
}

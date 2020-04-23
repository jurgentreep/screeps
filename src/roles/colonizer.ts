export const roleColonizer = (creep: Creep) => {
  const roomName = 'E11N45';

  if (creep.room.name === roomName) {
    const controller = creep.room.controller;

    if (controller) {
      const result = creep.claimController(controller);

      if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(controller, { visualizePathStyle: { stroke: '#00ffff' } });
      } else {
        console.log(result);
      }
    } else {
      console.log('no controller found');
    }
  } else {
    creep.moveTo(new RoomPosition(25, 25, 'E11N45'), { visualizePathStyle: { stroke: '#00ffff' } });
  }
}

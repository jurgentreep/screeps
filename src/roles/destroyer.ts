export const roleDestroyer = (creep: Creep) => {
  // creep.moveTo(46, 30);
  const roomName = 'E12N36';

  if (creep.room.name === roomName) {
    const spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_SPAWN
    });

    if (spawn) {
      if (creep.dismantle(spawn) === ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    }
  } else {
    creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#00ffff', lineStyle: 'solid' } });
  }
};

export const roleDestroyer = (creep: Creep) => {
  const roomName = 'E12N46';

  if (creep.room.name === roomName) {
    const tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_TOWER
    });

    if (tower) {
      if (creep.dismantle(tower) === ERR_NOT_IN_RANGE) {
        creep.moveTo(tower);
      }
    } else {
      const spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_SPAWN
      });

      if (spawn) {
        if (creep.dismantle(spawn) === ERR_NOT_IN_RANGE) {
          creep.moveTo(spawn);
        }
      }
    }
  } else {
    creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#00ffff', lineStyle: 'solid' } });
  }
};

export const roleDestroyer = (creep: Creep) => {
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

    const extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_EXTENSION
    });

    if (extension) {
      if (creep.dismantle(extension) === ERR_NOT_IN_RANGE) {
        creep.moveTo(extension);
      }
    } else {
      const hostileConstructionSite = creep.pos.findClosestByPath(FIND_HOSTILE_CONSTRUCTION_SITES);

      if (hostileConstructionSite) {
        creep.moveTo(hostileConstructionSite);
      }
    }
  } else {
    creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#ff0000', lineStyle: 'solid' } });
  }
};

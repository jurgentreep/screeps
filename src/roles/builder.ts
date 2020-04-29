export const roleBuilder = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (creep.memory.working) {
    const storage = creep.room.storage;

    if (storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) >= 50000) {
      if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage)
      }
    }
  } else {
    const wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: s => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART) && s.hits < 10000
    });

    if (wall) {
      if (creep.repair(wall) === ERR_NOT_IN_RANGE) {
        creep.moveTo(wall);
      }
    } else {
      const constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

      if (constructionSite) {
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
        }
      } else {
        for (const nextHits of [60, 120, 180, 240, 300, 360]) {
          const wall = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_WALL || s.structureType === STRUCTURE_RAMPART) && s.hits < (nextHits * 1000)
          });

          if (wall) {
            if (creep.repair(wall) === ERR_NOT_IN_RANGE) {
              creep.moveTo(wall);
            }
            break;
          }
        }
      }
    }
  }
};

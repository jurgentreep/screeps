export const roleRepair = (creep: Creep) => {
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
    const damagedStructures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => {
        if (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) {
          return structure.hits < structure.hitsMax;
        } else if (structure.structureType === STRUCTURE_RAMPART) {
          return structure.hits < 10000;
        } else {
          return false;
        }
      }
    });

    if (damagedStructures) {
      if (creep.repair(damagedStructures) == ERR_NOT_IN_RANGE) {
        creep.moveTo(damagedStructures, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else {
      const structures = creep.room.find(FIND_CONSTRUCTION_SITES);

      if (structures[0]) {
        if (creep.build(structures[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structures[0], { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
        }
      } else {
        creep.moveTo(25, 25);
      }
    }
  }
};

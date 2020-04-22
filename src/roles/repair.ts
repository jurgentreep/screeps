export const roleRepair = (creep: Creep) => {
  if (creep.memory.working && creep.store.getUsedCapacity() == 0) {
    creep.memory.working = false;
  }

  if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    const damagedStructures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) &&
          structure.hits < structure.hitsMax
        );
      }
    });

    if (damagedStructures) {
      if (creep.repair(damagedStructures) == ERR_NOT_IN_RANGE) {
        creep.moveTo(damagedStructures, { visualizePathStyle: { stroke: '#ffffff' } });
      }
    } else {
      creep.moveTo(9, 35);
    }
  }
  else {
    const storage = creep.room.storage;

    if (storage) {
      if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage)
      }
    }
  }
};

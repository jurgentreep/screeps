export const roleFiller = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (creep.memory.working === true) {
    const storage = creep.room.storage;

    if (storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
      if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage)
      }
    } else {
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity() > 0
      });

      if (container) {
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      }
    }
  } else {
    const spawn = creep.room.find<StructureSpawn>(FIND_MY_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_SPAWN
    })[0];

    if (spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    } else {
      const energyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });

      if (energyContainer) {
        if (creep.transfer(energyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(energyContainer);
        }
      } else {
        creep.moveTo(spawn);
      }
    }
  }
};

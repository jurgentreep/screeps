export const roleHarvester = {
  run: function (creep: Creep) {
    if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
      creep.memory.working = true;
    }
    if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = false;
    }

    if (creep.memory.working === true) {
      const container = creep.pos.findClosestByPath<StructureStorage>(FIND_STRUCTURES, {
        filter: {
          structureType: STRUCTURE_STORAGE
        }
      });

      if (container && creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(container)
      }
    } else {
      const energyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });

      if (energyContainer && creep.transfer(energyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(energyContainer, { visualizePathStyle: { stroke: '#ffffff' } });
      } else {
        creep.moveTo(9, 35);
      }
    }
  }
};

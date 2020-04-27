export const roleHarvester = (creep: Creep, job: HarvesterJob) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (creep.memory.working === true) {
    const storage = creep.room.storage;

    if (storage) {
      if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage)
      }
    }
  } else {
    if (job.spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      if (creep.transfer(job.spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(job.spawn, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
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
          creep.moveTo(energyContainer, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
        }
      } else {
        creep.moveTo(job.spawn, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
      }
    }
  }
};

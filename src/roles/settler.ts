export const roleSettler = (creep: Creep, job: SettlerJob) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (creep.memory.working) {
    const droppedResources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

    if (droppedResources) {
      if (creep.pickup(droppedResources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedResources);
      }
    } else {
      const storage = creep.room.storage;

      if (storage) {
        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage)
        }
      }
    }
  } else {
    if (job.spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      if (creep.transfer(job.spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(job.spawn, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid', strokeWidth: 0.05 } });
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
        if (creep.room.controller) {
          if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
          }
        } else {
          console.log(`No controller in room ${creep.room.name}`);
        }
      }
    }
  }
}

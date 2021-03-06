export const roleUpgrader = (creep: Creep, job?: UpgradeJob) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (creep.memory.working) {
    if (job) {
      if (job.containerId) {
        const container = Game.getObjectById(job.containerId);

        if (container && container.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
          if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
          }
        }
      } else if (job.linkId) {
        const link = Game.getObjectById(job.linkId);

        if (link && link.store.getUsedCapacity(RESOURCE_ENERGY) >= 300) {
          if (creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(link);
          }
        }
      } else {
        console.log(`${creep.name} has a job but no containerId or linkId`)
      }
    } else {
      const storage = creep.room.storage;

      if (storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) > 50000) {
        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage)
        }
      }
    }
  } else {
    if (creep.room.controller) {
      // prevent upgrader from blocking the storage
      if (creep.room.storage && creep.pos.inRangeTo(creep.room.storage, 1)) {
        creep.moveTo(creep.room.controller);
      } else if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  }
};

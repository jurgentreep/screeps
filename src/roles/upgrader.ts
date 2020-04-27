export const roleUpgrader = (creep: Creep, job: UpgradeJob) => {
  if (creep.memory.working && creep.store.getUsedCapacity() == 0) {
    creep.memory.working = false;
  }

  if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    if (creep.room.controller) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  } else {
    if (job.containerId && job.linkId) {
      const container = Game.getObjectById(job.containerId);

      if (container && container.store.getUsedCapacity(RESOURCE_ENERGY) >= 300) {
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      } else {
        const link = Game.getObjectById(job.linkId);

        if (link && link.store.getUsedCapacity(RESOURCE_ENERGY) >= 300) {
          if (creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(link);
          }
        }
      }
    } else {
      const storage = creep.room.storage;

      if (storage) {
        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage)
        }
      }
    }
  }
};

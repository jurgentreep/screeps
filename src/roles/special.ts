export const roleSpecial = (creep: Creep, job?: SpecialJob) => {
  if (job) {
    if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
      creep.memory.working = true;
    }

    if (creep.memory.working && creep.store.getFreeCapacity() <= 2) {
      creep.memory.working = false;
    }

    if (creep.memory.working) {
      const container = Game.getObjectById(job.containerId);

      if (container) {
        if (creep.pos.isEqualTo(container.pos)) {
          if (job.linkId && container && container.store.getUsedCapacity() >= 100) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(container);
            }
          } else {
            const source = Game.getObjectById(job.sourceId);

            if (source) {
              if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
              }
            }
          }
        } else {
          creep.moveTo(container);
        }
      }
    } else {
      const container = Game.getObjectById(job.containerId);

      if (container) {
        if (creep.pos.isEqualTo(container.pos)) {
          if (job.linkId) {
            const link = Game.getObjectById(job.linkId);

            if (link) {
              creep.transfer(link, RESOURCE_ENERGY);
            }
          } else {
            creep.drop(RESOURCE_ENERGY);
          }
        } else {
          creep.moveTo(container);
        }
      }
    }
  } else {
    console.log(`${creep.name} can't work without a job`);
  }
};

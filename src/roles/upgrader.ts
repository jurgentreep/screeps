export const roleUpgrader = (creep: Creep) => {
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
    const containerId = '5ea44320fc04d6d37a191992' as Id<StructureContainer>;
    const container = Game.getObjectById(containerId);

    if (container && container.store.getUsedCapacity(RESOURCE_ENERGY) >= 300) {
      if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(container);
      }
    } else {
      const linkId = '5ea446a16586591e643f21f1' as Id<StructureLink>;
      const link = Game.getObjectById(linkId);

      if (link && link.store.getUsedCapacity(RESOURCE_ENERGY) >= 300) {
        if (creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(link);
        }
      }
    }
  }
};

export const roleMegaHauler = (creep: Creep) => {
  if (creep.memory.working && creep.store.getUsedCapacity() == 0) {
    creep.memory.working = false;
  }

  if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working) {
    const structures = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (structures[0]) {
      if (creep.build(structures[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(structures[0]);
      }
    } else {
      if (creep.room.controller) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        }
      }
    }
  } else {
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
  }
};

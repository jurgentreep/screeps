export const roleSettler = (creep: Creep) => {
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
      const source = creep.pos.findClosestByPath(FIND_SOURCES);

      if (source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
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

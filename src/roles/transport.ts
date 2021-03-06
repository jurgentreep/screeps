export const roleTransport = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (creep.memory.working === true) {
    const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity() >= 500
    });

    if (container) {
      if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(container);
      }
    } else {
      const tombStone = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
        filter: t => t.store.getUsedCapacity(RESOURCE_ENERGY) > 0
      });

      if (tombStone) {
        if (creep.withdraw(tombStone, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(tombStone);
        }
      } else {
        const droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
          filter: d => d.resourceType === RESOURCE_ENERGY
        });

        if (droppedResource) {
          if (creep.pickup(droppedResource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedResource);
          }
        }
      }
    }
  } else {
    if (creep.room.storage) {
      if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.storage);
      }
    }
  }
};

export const roleSuicide = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  const roomName = 'E11N38';

  if (creep.memory.working && creep.room.name === roomName) {
    const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
    });

    if (container) {
      if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(container);
      }
    } else {
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER
      });

      if (container) {
        creep.moveTo(container);
      }
    }
  } else if (!creep.memory.working) {
    const storageId = '5eaee91f24db4121a516fe40' as Id<StructureStorage>;
    const storage = Game.getObjectById(storageId);

    if (storage) {
      if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(storage);
      }
    } else {
      const containerId = '5eada97eb221a4f052502452' as Id<StructureContainer>;
      const container = Game.getObjectById(containerId);

      if (container) {
        if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      }
    }
  } else {
    creep.moveTo(new RoomPosition(25, 25, roomName));
  }
};

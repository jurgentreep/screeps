export const roleFiller = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (creep.memory.working === true) {
    const storage = creep.room.storage;

    if (storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
      if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage)
      }
    } else {
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity() > 0
      });

      if (container) {
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      }
    }
  } else {
    const spawn = creep.room.find<StructureSpawn>(FIND_MY_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_SPAWN
    })[0];

    if (spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(spawn);
      }
    } else {
      const extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_EXTENSION && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      });

      if (extension) {
        if (creep.transfer(extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(extension);
        }
      } else {
        const tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => s.structureType === STRUCTURE_TOWER && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });

        if (tower) {
          if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(tower);
          }
        } else {
          creep.moveTo(spawn);
        }
      }
    }
  }
};

export const roleTransfer = {
  run: function (creep: Creep) {
    if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
      creep.memory.working = true;
    }
    if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = false;
    }

    if (creep.memory.working === true) {
      const links = creep.room.find(FIND_STRUCTURES, {
        filter: {
          structureType: STRUCTURE_LINK
        },
      });

      if (creep.withdraw(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(links[1])
      }
    } else {
      if (creep.room.storage && creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.storage);
      }
    }
  }
};

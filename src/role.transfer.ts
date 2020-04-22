export const roleTransfer = {
  run: function (creep: Creep, room: Room) {
    if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
      creep.memory.working = true;
    }
    if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = false;
    }

    if (creep.memory.working === true) {
      const links = room.find(FIND_STRUCTURES, {
        filter: {
          structureType: STRUCTURE_LINK
        },
      });

      if (creep.withdraw(links[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(links[1])
      }
    } else {
      if (room.storage && creep.transfer(room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(room.storage);
      }
    }
  }
};

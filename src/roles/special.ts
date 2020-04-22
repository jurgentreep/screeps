export const roleSpecial = {
  run: function (creep: Creep, room: Room) {
    if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
      creep.memory.working = true;
    }
    if (creep.memory.working && creep.store.getFreeCapacity() <= 2) {
      creep.memory.working = false;
    }

    if (creep.memory.working) {
      const sources = creep.room.find(FIND_SOURCES);

      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1]);
      }
    } else {
      const links = room.find(FIND_STRUCTURES, {
        filter: s => s.structureType == STRUCTURE_LINK
      });

      creep.transfer(links[0], RESOURCE_ENERGY);
    }
  }
}

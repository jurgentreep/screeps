export const roleRemoteMiner = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  const roomName = 'E11N39';
  creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#00ffff', lineStyle: 'solid' } });

  // if (creep.memory.working && creep.room.name === roomName) {
  //   const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

  //   if (source) {
  //     if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
  //       creep.moveTo(source);
  //     }
  //   }
  // } else if (!creep.memory.working) {
  //   const storage = creep.room.storage;

  //   if (storage) {
  //     if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
  //       creep.moveTo(storage);
  //     }
  //   }
  // } else {
  //   creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#00ffff', lineStyle: 'solid' } });
  // }
};

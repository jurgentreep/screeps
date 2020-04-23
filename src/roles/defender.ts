export const roleDefender = (creep: Creep) => {
  const roomName = 'E11N45';

  if (creep.room.name === roomName) {
    const hostiles = creep.room.find(FIND_HOSTILE_CREEPS);

    if (hostiles.length) {
      const result = creep.attack(hostiles[0]);

      if (result === ERR_NOT_IN_RANGE) {
        creep.moveTo(hostiles[0]);
      }
    } else {
      if (creep.room.controller) {
        creep.moveTo(creep.room.controller);
      }
    }
  } else {
    creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#00ffff' } });
  }
}

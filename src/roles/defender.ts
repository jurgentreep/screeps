export const roleDefender = (creep: Creep) => {
  let hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if (hostile) {
    const result = creep.attack(hostile);

    if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(hostile);
    }
  } else {
    if (creep.room.controller) {
      creep.moveTo(creep.room.controller);
    }
  }
}

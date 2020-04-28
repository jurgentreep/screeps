export const roleDefender = (creep: Creep) => {
  const hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if (hostile) {
    const result = creep.attack(hostile);

    if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(hostile);
    }
  } else {
    creep.moveTo(25, 25);
  }
}

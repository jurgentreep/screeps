export const roleDefender = (creep: Creep) => {
  const hostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if (hostile) {
    const result = creep.attack(hostile);

    if (result === ERR_NOT_IN_RANGE) {
      creep.moveTo(hostile, { visualizePathStyle: { stroke: '#ff0000', lineStyle: 'solid' } });
    }
  } else {
    const spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_SPAWN
    });

    if (spawn) {
      creep.moveTo(spawn);
    }
  }
}

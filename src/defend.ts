const getTowers = (room: Room) => room.find<StructureTower>(
  FIND_MY_STRUCTURES,
  {
    filter: {
      structureType: STRUCTURE_TOWER
    }
  }
);

export const defend = (room: Room) => {
  const towers = getTowers(room);
  const hostile = towers[0].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  const hurtCreeps = _.filter(Game.creeps, (creep) => creep.hits < creep.hitsMax);

  if (hostile) {
    const username = hostile.owner.username;
    Game.notify(`User ${username} spotted in room https://screeps.com/a/#!/history/shard3/${room.name}?t=${Math.floor(Game.time / 100) * 100}`);
    towers.forEach(tower => tower.attack(hostile));
  } else if (hurtCreeps.length > 0) {
    towers.forEach(tower => tower.heal(hurtCreeps[0]));
  }
}

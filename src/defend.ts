const getTowers = (room: Room) => room.find<StructureTower>(
  FIND_MY_STRUCTURES,
  {
    filter: {
      structureType: STRUCTURE_TOWER
    }
  }
);

export const defend = (room: Room) => {
  let hostiles = room.find(FIND_HOSTILE_CREEPS);
  hostiles = _.sortBy(hostiles, (hostile) => hostile.body.map(part => part.type).includes(HEAL));
  const towers = getTowers(room);
  const hurtCreeps = _.filter(Game.creeps, (creep) => creep.hits < creep.hitsMax);

  if (hostiles.length > 0) {
    const username = hostiles[0].owner.username;
    Game.notify(`User ${username} spotted in room https://screeps.com/a/#!/history/shard3/${room.name}?t=${Math.floor(Game.time / 100) * 100}`);
    towers.forEach(tower => tower.attack(hostiles[0]));
  } else if (hurtCreeps.length > 0) {
    towers.forEach(tower => tower.heal(hurtCreeps[0]));
  }
}

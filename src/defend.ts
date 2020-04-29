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
  // const hostiles = room.find(FIND_HOSTILE_CREEPS);
  // hostiles.sort((a, b) => b.getActiveBodyparts(HEAL) - a.getActiveBodyparts(HEAL));
  const hurtCreeps = _.filter(Game.creeps, (creep) => creep.hits < creep.hitsMax);
  const damagedStructure = room.find(FIND_STRUCTURES, {
    filter: s => s.structureType === STRUCTURE_RAMPART && s.hits < 60000
  })[0];

  // if (hostiles[0]) {
  //   const username = hostiles[0].owner.username;
  //   Game.notify(`User ${username} spotted in room https://screeps.com/a/#!/history/shard3/${room.name}?t=${Math.floor(Game.time / 100) * 100}`);
  //   towers.forEach(tower => tower.attack(hostiles[0]));
  // } else
  if (hurtCreeps.length > 0) {
    towers.forEach(tower => tower.heal(hurtCreeps[0]));
  } else if (damagedStructure) {
    towers.forEach(tower => tower.repair(damagedStructure));
  }
}

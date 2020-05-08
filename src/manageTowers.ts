const getTowers = (room: Room) => room.find<StructureTower>(
  FIND_MY_STRUCTURES,
  {
    filter: {
      structureType: STRUCTURE_TOWER
    }
  }
);

export const manageTowers = (room: Room) => {
  const towers = getTowers(room);
  const hurtCreep = _.filter(Game.creeps, (creep) => creep.hits < creep.hitsMax)[0];

  if (hurtCreep) {
    towers.forEach(tower => tower.heal(hurtCreep));
  }
}

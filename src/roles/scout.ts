export const roleScout = (creep: Creep) => {
  if (Game.flags.scout) {
    creep.moveTo(Game.flags.scout.pos, { visualizePathStyle: { stroke: '#00ffff', lineStyle: 'solid' } });
  }
}

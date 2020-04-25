export const transferEnergy = (room: Room) => {
  const links = room.find<StructureLink>(FIND_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_LINK
    }
  });

  if (links[0] && links[2]) {
    links[0].transferEnergy(links[2]);
  }
}

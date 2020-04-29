export const transferEnergy = (room: Room) => {
  const links = room.find<StructureLink>(FIND_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_LINK
    }
  });

  if (room.name === 'E12N45') {
    if (links[0] && links[1]) {
      links[0].transferEnergy(links[1]);
      links[2].transferEnergy(links[1]);
    }
  } else {
    links[1].transferEnergy(links[0]);
  }
}

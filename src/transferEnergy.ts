export const transferEnergy = (room: Room) => {
  const links = room.find<StructureLink>(FIND_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_LINK
    }
  });

  if (links[0] && links[2]) {
    if (room.storage && room.storage.store.getUsedCapacity() < 100000) {
      links[0].transferEnergy(links[1]);
    } else if (links[2].store.getUsedCapacity(RESOURCE_ENERGY) < 600) {
      links[0].transferEnergy(links[2]);
    } else {
      links[0].transferEnergy(links[1]);
    }
  }
}

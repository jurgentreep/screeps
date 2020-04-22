export const transferEnergy = (room: Room) => {
  const [linkFrom, linkTo] = room.find<StructureLink>(FIND_STRUCTURES, {
    filter: {
      structureType: STRUCTURE_LINK
    }
  });

  if (linkFrom && linkTo) {
    linkFrom.transferEnergy(linkTo);
  }
}

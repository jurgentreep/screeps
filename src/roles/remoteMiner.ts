export const roleRemoteMiner = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  const roomName = 'E13N45';

  if (creep.memory.working && creep.room.name === roomName) {
    const sourceId = '5bbcadab9099fc012e6379b8' as Id<Source>;
    const source = Game.getObjectById(sourceId);

    if (source) {
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  } else if (!creep.memory.working) {
    const constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    const sourceId = '5bbcadab9099fc012e6379b8' as Id<Source>;
    const source = Game.getObjectById(sourceId);
    if (constructionSite && source && source.energy > 300 && creep.room.name === roomName) {
      if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSite);
      }
    } else {
      const damagedRoad = creep.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: s => s.structureType === STRUCTURE_ROAD && s.hits < (s.hitsMax - 300)
      })[0];

      if (damagedRoad && source && source.energy > 300 && creep.room.name === roomName) {
        creep.repair(damagedRoad);
      } else {
        const controllerId = '5bbcad9c9099fc012e63782a' as Id<StructureController>;
        const controller = Game.getObjectById(controllerId);

        if (controller) {
          if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
          }
        }
      }
    }
  } else {
    creep.moveTo(new RoomPosition(35, 30, roomName), { visualizePathStyle: { stroke: '#00ffff', lineStyle: 'solid' } });
  }
};

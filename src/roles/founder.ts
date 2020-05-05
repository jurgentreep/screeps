export const roleFounder = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (Game.flags.colonize.room && creep.room.name === Game.flags.colonize.room.name) {
    if (creep.memory.working) {
      const resource = creep.pos.findClosestByPath(FIND_SOURCES);

      if (resource) {
        if (creep.harvest(resource) === ERR_NOT_IN_RANGE) {
          creep.moveTo(resource);
        }
      }
    } else {
      const spawn = creep.pos.findClosestByPath<StructureSpawn>(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_SPAWN
      });

      if (spawn && spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(spawn);
        }
      } else {
        const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

        if (constructionSite) {
          if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionSite);
          }
        } else {
          if (creep.room.controller) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller);
            }
          } else {
            console.log(`No controller in room ${creep.room.name}`);
          }
        }
      }
    }
  } else {
    creep.moveTo(Game.flags.colonize.pos, { visualizePathStyle: { stroke: '#00ffff' } });
  }
}

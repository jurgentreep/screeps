export const roleSettler = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (creep.memory.working) {
    const storage = creep.room.storage;

    if (storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) >= 50000) {
      if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(storage)
      }
    } else {
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity() >= 1000
      });

      if (container) {
        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      } else {
        const resource = creep.pos.findClosestByPath(FIND_SOURCES);

        if (resource) {
          if (creep.harvest(resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(resource);
          }
        }
      }
    }
  } else {
    if (creep.room.controller && creep.room.controller.ticksToDowngrade < 5000) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
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
        const energyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_TOWER) &&
              structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
          }
        });

        if (energyContainer) {
          if (creep.transfer(energyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(energyContainer);
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
    }
  }
}

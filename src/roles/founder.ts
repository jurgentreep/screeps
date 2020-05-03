export const roleFounder = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  if (Game.flags.colonize.room && creep.room.name === Game.flags.colonize.room.name) {
    if (creep.memory.working) {
      const hostileStructureWithoutEnergy = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
        filter: s => (
          s.structureType === STRUCTURE_EXTENSION ||
          s.structureType === STRUCTURE_TOWER ||
          s.structureType === STRUCTURE_SPAWN
        ) && s.store && s.store.getUsedCapacity(RESOURCE_ENERGY) === 0
      });

      if (hostileStructureWithoutEnergy) {
        if (creep.dismantle(hostileStructureWithoutEnergy) === ERR_NOT_IN_RANGE) {
          creep.moveTo(hostileStructureWithoutEnergy);
        }
      } else {
        const ruin = creep.pos.findClosestByPath(FIND_RUINS, {
          filter: r => r.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        });

        if (ruin) {
          if (creep.withdraw(ruin, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(ruin);
          }
        } else {
          const droppedResource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);

          if (droppedResource) {
            if (creep.pickup(droppedResource) == ERR_NOT_IN_RANGE) {
              creep.moveTo(droppedResource);
            }
          } else {
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
                const hostileStructureWithEnergy = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                  filter: s => (
                    s.structureType === STRUCTURE_EXTENSION ||
                    s.structureType === STRUCTURE_TOWER ||
                    s.structureType === STRUCTURE_SPAWN
                  ) && s.store && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
                });

                if (hostileStructureWithEnergy) {
                  if (creep.withdraw(hostileStructureWithEnergy, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostileStructureWithEnergy);
                  }
                } else {
                  const resource = creep.pos.findClosestByPath(FIND_SOURCES);

                  if (resource) {
                    if (creep.harvest(resource) === ERR_NOT_IN_RANGE) {
                      creep.moveTo(resource);
                    }
                  } else {
                    creep.moveTo(25, 25);
                  }
                }
              }
            }
          }
        }
      }
    } else {
      // const spawn = creep.pos.findClosestByPath<StructureSpawn>(FIND_STRUCTURES, {
      //   filter: s => s.structureType === STRUCTURE_SPAWN
      // });

      // if (spawn && spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      //   if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      //     creep.moveTo(spawn);
      //   }
      // } else {
      //   const energyContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      //     filter: (structure) => {
      //       return (structure.structureType == STRUCTURE_EXTENSION ||
      //         structure.structureType == STRUCTURE_TOWER) &&
      //         structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      //     }
      //   });

      //   if (energyContainer) {
      //     if (creep.transfer(energyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      //       creep.moveTo(energyContainer);
      //     }
      //   } else {
      //     const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      //       filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getFreeCapacity() > 0
      //     });

      //     if (container) {
      //       if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      //         creep.moveTo(container);
      //       }
      //     } else {
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
    //     }
    //   }
    // }
  } else {
    creep.moveTo(Game.flags.colonize.pos, { visualizePathStyle: { stroke: '#00ffff' } });
  }
}

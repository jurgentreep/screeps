export const roleSuicide = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  const roomName = 'E11N38';

  if (creep.memory.working && creep.room.name === roomName) {
    const droppedResources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);

    if (droppedResources) {
      if (creep.pickup(droppedResources) == ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedResources);
      }
    } else {
      const extension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_EXTENSION && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
      });

      if (extension) {
        if (creep.withdraw(extension, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(extension);
        }
      } else {
        const spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: s => s.structureType === STRUCTURE_SPAWN && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        });

        if (spawn) {
          if (creep.withdraw(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn);
          }
        } else {
          const tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
          });

          if (tower) {
            if (creep.withdraw(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.moveTo(tower);
            }
          } else {
            const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
              filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
            });

            if (container) {
              if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
              }
            } else {
              const storage = creep.room.storage;

              if (storage) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                  creep.moveTo(storage);
                }
              } else {
                creep.moveTo(25, 25)
              }
            }
          }
        }
      }
    }
  } else if (!creep.memory.working) {
    const storageId = '5eaee91f24db4121a516fe40' as Id<StructureStorage>;
    const storage = Game.getObjectById(storageId);

    if (storage) {
      if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(storage);
      }
    } else {
      const containerId = '5eada97eb221a4f052502452' as Id<StructureContainer>;
      const container = Game.getObjectById(containerId);

      if (container) {
        if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container);
        }
      }
    }
  } else {
    creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#00ffff', lineStyle: 'solid' } });
  }
};

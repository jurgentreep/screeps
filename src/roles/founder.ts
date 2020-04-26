export const roleFounder = (creep: Creep) => {
  if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
    creep.memory.working = true;
  }

  if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
    creep.memory.working = false;
  }

  const roomName = 'E11N45';

  if (creep.room.name === roomName) {
    if (creep.memory.working) {
      const source = creep.pos.findClosestByPath(FIND_SOURCES);

      if (source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
        }
      }
    } else {
      const damagedStructures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            (structure.structureType == STRUCTURE_ROAD || structure.structureType == STRUCTURE_CONTAINER) &&
            structure.hits < structure.hitsMax
          );
        }
      });

      if (damagedStructures) {
        if (creep.repair(damagedStructures) == ERR_NOT_IN_RANGE) {
          creep.moveTo(damagedStructures, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
        }
      } else {
        const structures = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (structures[0]) {
          if (creep.build(structures[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(structures[0], { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
          }
        } else {
          const spawn = creep.room.find<StructureSpawn>(FIND_STRUCTURES, {
            filter: {
              structureType: STRUCTURE_SPAWN
            }
          })[0];

          if (spawn && spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
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
                creep.moveTo(energyContainer, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
              }
            } else {
              if (creep.room.controller) {
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                  creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff', lineStyle: 'solid' } });
                }
              } else {
                console.log(`No controller in room ${creep.room.name}`);
              }
            }
          }
        }
      }
    }
  } else {
    creep.moveTo(new RoomPosition(25, 25, roomName), { visualizePathStyle: { stroke: '#00ffff', lineStyle: 'solid' } });
  }
}

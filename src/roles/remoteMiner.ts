export const roleRemoteMiner = (creep: Creep, job?: RemoteMinerJob) => {
  if (job) {
    if (!creep.memory.working && creep.store.getUsedCapacity() === 0) {
      creep.memory.working = true;
    }

    if (creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = false;
    }

    if (creep.memory.working && creep.room.name === job.roomName) {
      const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

      if (source) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
          creep.moveTo(source);
        }
      }
    } else if (!creep.memory.working) {
      const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

      if (constructionSite) {
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite);
        }
      } else {
        const container = creep.pos.findClosestByPath<StructureContainer>(FIND_STRUCTURES, {
          filter: s => s.structureType === STRUCTURE_CONTAINER && (s.store.getFreeCapacity() > 0 || s.hits < s.hitsMax)
        });

        if (container) {
          if (container.hits < container.hitsMax) {
            if (creep.repair(container) === ERR_NOT_IN_RANGE) {
              creep.moveTo(container);
            }
          } else {
            const result = creep.transfer(container, RESOURCE_ENERGY);

            if (result === ERR_NOT_IN_RANGE) {
              creep.moveTo(container);
            } else if (result !== OK) {
              console.log(result);
            }
          }
        }
      }
    } else {
      creep.moveTo(new RoomPosition(25, 25, job.roomName));
    }
  } else {
    console.log(`${creep.name} can't function without a job`);
  }
};

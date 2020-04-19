var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.harvesting && creep.store.getUsedCapacity() === 0) {
            creep.memory.harvesting = true;
            creep.say('Harvesting');
        }
        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
            creep.say('Transport');
        }
        
        if (creep.memory.harvesting === true) {
            const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
            });
            
            if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container)
            }
        } else {
            const energyContainers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(energyContainers.length > 0) {
                if(creep.transfer(energyContainers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyContainers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                const sites = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(sites.length) {
                    if(creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sites[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    creep.moveTo(9, 35);
                }
            }
        }
    }
};

module.exports = roleHarvester;
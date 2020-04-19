var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
        const energyCapacityAvailable = Game.spawns['Spawn1'].room.energyCapacityAvailable;
        const roomFull = energyAvailable === energyCapacityAvailable;
        
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
        } else if (roomFull === true) {
            creep.moveTo(Game.spawns['Spawn1']);
        } else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;
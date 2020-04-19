const roleSpecial = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        const closestSource = creep.pos.findClosestByPath(FIND_SOURCES);
        
        if (!creep.memory.harvesting && creep.store.getUsedCapacity() === 0) {
            creep.memory.harvesting = true;
            creep.say('Harvesting');
        }
        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
            creep.say('Dropping');
        }
        
        if (creep.memory.harvesting) {
            if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            const closestConstructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                filter: structure => structure.structureType === STRUCTURE_CONTAINER
            });
            
            if (closestConstructionSite) {
                creep.build(closestConstructionSite);
            } else {
                creep.drop(RESOURCE_ENERGY);
            }
        }
    }
}

module.exports = roleSpecial;
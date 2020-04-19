const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleSpecial = require('role.special');
const roleRepair = require('role.repair');

const spawnCreep = (role, newName, amountOfHarvesters) => {
    const energyAvailable = Game.spawns['Spawn1'].room.energyAvailable;
    // Upgraders
    let bodyParts = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    
    if (role === 'harvester') {
        bodyParts = [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
        
        if (amountOfHarvesters < 1 && energyAvailable < 600) {
            bodyParts = [WORK, CARRY, MOVE];
        }
    }
    
    if (role === 'special') {
        bodyParts = [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE];
        
        if (energyAvailable < 800) {
            bodyParts = [WORK, CARRY, MOVE];
        }
    }
    
    if (role === 'repair') {
        bodyParts = [WORK, CARRY, MOVE, MOVE];
    }

    Game.spawns['Spawn1'].spawnCreep(bodyParts, newName, {
        memory: {role},
        directions: [BOTTOM],
    });
}

module.exports.loop = function () {
    
    Game.spawns['Spawn1'].room.controller.activateSafeMode();

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    const specials = _.filter(Game.creeps, (creep) => creep.memory.role == 'special');
    const repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    
    const sites = Game.spawns['Spawn1'].room.find(FIND_CONSTRUCTION_SITES);

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        spawnCreep('harvester', newName, harvesters.length);
    } else if (specials.length < 1) {
        var newName = 'Special' + Game.time;
        console.log('Spawning new special: ' + newName);
        spawnCreep('special', newName);
    } else if (repairs.length < 1) {
        var newName = 'Repair' + Game.time;
        console.log('Spawning new repair: ' + newName);
        spawnCreep('repair', newName);
    } else if(upgraders.length < 5) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        spawnCreep('upgrader', newName);
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'special') {
            roleSpecial.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
    }
}
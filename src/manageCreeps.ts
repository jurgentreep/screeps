import { roleFiller } from "roles/filler";
import { roleUpgrader } from "roles/upgrader";
import { roleSpecial } from "roles/special";
import { roleRepair } from "roles/repair";
import { roleColonizer } from "roles/colonizer";
import { roleFounder } from "roles/founder";
import { roleSettler } from "roles/settler";
import { roleSuicide } from "roles/suicide";
import { roleBuilder } from "roles/builder";
import { roleTransport } from "roles/transport";
import { roleDestroyer } from "roles/destroyer";
import { roleRemoteMiner } from "roles/remoteMiner";

export const configureCreep = (role: string, energyAvailable: number, energyCapacityAvailable: number, numberOfCreeps: number) => {
  // Upgraders
  let bodyParts: BodyPartConstant[] = [MOVE];

  if (role === 'transfer') {
    bodyParts = [MOVE, CARRY];
  }

  if (role === 'filler') {
    bodyParts = [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY];

    if (energyAvailable >= 600) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
    } else if (energyAvailable >= 500) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY];
    }
  }

  if (role === 'transport') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
  }

  if (role === 'special') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY];
  }

  if (role === 'repair') {
    bodyParts = [WORK, CARRY, MOVE, MOVE];
  }

  if (role === 'colonizer') {
    bodyParts = [MOVE, CLAIM];
  }

  if (role === 'defender') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK];
  }

  if (role === 'settler') {
    bodyParts = [MOVE, WORK, CARRY];

    if (numberOfCreeps >= 4 && energyCapacityAvailable >= 400) {
      bodyParts = [MOVE, MOVE, WORK, WORK, CARRY, CARRY];
    }

    if (numberOfCreeps >= 4 && energyCapacityAvailable >= 600) {
      bodyParts = [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY];
    }

    if (numberOfCreeps >= 4 && energyCapacityAvailable >= 800) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY];
    }

    if (numberOfCreeps >= 4 && energyCapacityAvailable >= 1000) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY];
    }
  }

  if (role === 'suicide') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
  }

  if (role === 'destroyer') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
  }

  if (role === 'scout') {
    bodyParts = [MOVE];
  }

  if (role === 'upgrader' || role === 'remoteMiner' || role === 'builder') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];

    if (energyCapacityAvailable >= 1800) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
    }
  }

  return bodyParts;
}

const getJobIndex = (creeps: Creep[], jobs: Job[]) => {
  const jobIndexes = jobs.map((value, index) => index);
  const takenJobs = creeps.map(creep => creep.memory.jobIndex);
  const availableJobs = jobIndexes.filter(jobIndex => !takenJobs.includes(jobIndex));
  return availableJobs[0];
}

const spawnCreep = (role: string, spawn: StructureSpawn, creeps: Creep[], jobs: Job[]) => {
  const energyAvailable = spawn.room.energyAvailable;
  const energyCapacityAvailable = spawn.room.energyCapacityAvailable;
  const bodyParts = configureCreep(role, energyAvailable, energyCapacityAvailable, creeps.length);
  const newName = role + Game.time;
  const jobIndex = getJobIndex(creeps, jobs);

  spawn.spawnCreep(bodyParts, newName, {
    memory: {
      role,
      working: false,
      jobIndex,
      room: spawn.room.name,
    },
    // directions: [BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT],
  });
}

const getRoles = (spawn: StructureSpawn): Role[] => {
  const spawnName = spawn.name;

  if (spawnName === 'Spawn1') {
    // const creep = Game.getObjectById('5eb31201dd3086244181d891' as Id<Creep>);
    // if (creep) {
    //   spawn.recycleCreep(creep);
    // }
    return [
      {
        role: 'filler',
        minimum: 1,
        runner: roleFiller,
        jobs: [
          {
            spawn
          },
        ]
      },
      {
        role: 'special',
        minimum: 2,
        runner: roleSpecial,
        jobs: [
          {
            sourceId: '5bbcad8b9099fc012e6376b4' as Id<Source>,
            containerId: '5eaeb00fa7f2ba6b1373eaa9' as Id<StructureContainer>
          },
          {
            sourceId: '5bbcad8b9099fc012e6376b5' as Id<Source>,
            containerId: '5eaeaebc35fbe00a70a855f9' as Id<StructureContainer>
          }
        ]
      },
      {
        role: 'transport',
        minimum: 1,
        runner: roleTransport,
        jobs: []
      },
      {
        role: 'repair',
        minimum: 1,
        runner: roleRepair,
        jobs: []
      },
      {
        role: 'suicide',
        minimum: (() => {
          const storageId = '5e9d1747c0e18f2c5cf16473' as Id<StructureStorage>;
          const storage = Game.getObjectById(storageId);

          if (storage && storage.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
            return 1;
          } else {
            return 0;
          }
        })(),
        runner: roleSuicide,
        jobs: []
      },
      {
        role: 'upgrader',
        minimum: (
          spawn.room.storage && spawn.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 100000
        ) ? 2 : 0,
        runner: roleUpgrader,
        jobs: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ]
      },
      {
        role: 'builder',
        minimum: (
          spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0 ||
          spawn.room.find(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_RAMPART || s.structureType === STRUCTURE_WALL) && s.hits < 3000000
          }).length > 0
        ) ? 1 : 0,
        runner: roleBuilder,
        jobs: []
      },
      {
        role: 'colonizer',
        minimum: (
          (
            Game.flags.colonize &&
            Game.flags.colonize.room === undefined
          ) || (
            Game.flags.colonize &&
            Game.flags.colonize.room &&
            Game.flags.colonize.room.controller &&
            Game.flags.colonize.room.controller.my === false
          )
        ) ? 1 : 0,
        runner: roleColonizer,
        jobs: []
      },
      {
        role: 'founder',
        minimum: (
          Game.flags.colonize &&
          Game.flags.colonize.room &&
          Game.flags.colonize.room.controller &&
          Game.flags.colonize.room.controller.my &&
          Game.flags.colonize.room.find(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_SPAWN
          }).length === 0
        ) ? 2 : 0,
        runner: roleFounder,
        jobs: []
      },
      {
        role: 'destroyer',
        minimum: 0,
        runner: roleDestroyer,
        jobs: []
      },
      {
        role: 'remoteMiner',
        minimum: 0,
        runner: roleRemoteMiner,
        jobs: []
      },
    ];
  } else if (spawnName === 'Spawn2') {
    return [
      {
        role: 'filler',
        minimum: 1,
        runner: roleFiller,
        jobs: [
          {
            spawn
          },
        ]
      },
      {
        role: 'special',
        minimum: 2,
        runner: roleSpecial,
        jobs: [
          {
            sourceId: '5bbcad8b9099fc012e6376bf' as Id<Source>,
            containerId: '5eb2d087d44c4fee989dd81e' as Id<StructureContainer>
          },
          {
            sourceId: '5bbcad8b9099fc012e6376c1' as Id<Source>,
            containerId: '5eb2d069014c804324ed4d93' as Id<StructureContainer>
          }
        ]
      },
      {
        role: 'transport',
        minimum: 1,
        runner: roleTransport,
        jobs: []
      },
      {
        role: 'repair',
        minimum: 1,
        runner: roleRepair,
        jobs: []
      },
      {
        role: 'upgrader',
        minimum: (
          spawn.room.storage && spawn.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 100000
        ) ? 2 : 0,
        runner: roleUpgrader,
        jobs: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ]
      },
      {
        role: 'builder',
        minimum: (
          spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0 ||
          spawn.room.find(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_RAMPART || s.structureType === STRUCTURE_WALL) && s.hits < 3000000
          }).length > 0
        ) ? 3 : 0,
        runner: roleBuilder,
        jobs: []
      },
    ]
  } else if (spawnName === 'Spawn3') {
    return [
      {
        role: 'settler',
        minimum: 0,
        runner: roleSettler,
        jobs: []
      },
      {
        role: 'filler',
        minimum: 1,
        runner: roleFiller,
        jobs: [
          {
            spawn
          },
        ]
      },
      {
        role: 'special',
        minimum: 2,
        runner: roleSpecial,
        jobs: [
          {
            sourceId: '5bbcad8b9099fc012e6376bd' as Id<Source>,
            containerId: '5eb4235269ea70798adba0ae' as Id<StructureContainer>
          },
          {
            sourceId: '5bbcad8b9099fc012e6376bc' as Id<Source>,
            containerId: '5eb41e6e7fd840a5bc1cb220' as Id<StructureContainer>
          }
        ]
      },
      {
        role: 'transport',
        minimum: 1,
        runner: roleTransport,
        jobs: []
      },
      {
        role: 'repair',
        minimum: 1,
        runner: roleRepair,
        jobs: []
      },
      {
        role: 'upgrader',
        minimum: (
          spawn.room.storage && spawn.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 100000
        ) ? 2 : 0,
        runner: roleUpgrader,
        jobs: [
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ]
      },
      {
        role: 'builder',
        minimum: (
          spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0 ||
          spawn.room.find(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_RAMPART || s.structureType === STRUCTURE_WALL) && s.hits < 3000000
          }).length > 0
        ) ? 1 : 0,
        runner: roleBuilder,
        jobs: []
      },
    ]
  } else {
    console.error('Unexpected spawnName');
    return [];
  }
}

export const manageCreeps = (room: Room) => {
  const spawn = room.find<StructureSpawn>(FIND_MY_STRUCTURES, {
    filter: s => s.structureType === STRUCTURE_SPAWN
  })[0];

  if (spawn) {
    const initialRoles = getRoles(spawn);

    const roles = initialRoles.map(({ role, ...rest }) => ({
      ...rest,
      role,
      creeps: _.filter(Game.creeps, (creep) => creep.memory.role === role && creep.memory.room === spawn.room.name)
    }));

    roles.forEach(({ role, minimum, runner, creeps, jobs }) => {
      if (creeps.length < minimum) {
        spawnCreep(role, spawn, creeps, jobs);
      }

      creeps.forEach((creep, index) => {
        // temporary fix because we have no tower to heal this creep
        if (creep.getActiveBodyparts(MOVE) === 0) {
          creep.suicide();
        } else if (creep.memory.jobIndex !== undefined) {
          runner(creep, jobs[creep.memory.jobIndex]);
        } else {
          // fallback until everything has a job
          runner(creep, jobs[index]);
        }
      });
    });

    if (spawn.spawning) {
      const spawningCreep = Game.creeps[spawn.spawning.name];

      spawn.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        spawn.pos.x + 1,
        spawn.pos.y,
        { align: 'left', opacity: 0.8 }
      );
    }
  } else {
    // TODO: spawn is destroyed what to do now!?
  }
}


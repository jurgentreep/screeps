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
import { roleDefender } from "roles/defender";
import { roleReserver } from "roles/reserver";

export const configureCreep = (role: string, energyAvailable: number, energyCapacityAvailable: number, numberOfCreeps: number) => {
  // Upgraders
  let bodyParts: BodyPartConstant[] = [MOVE];

  if (role === 'transfer') {
    bodyParts = [MOVE, CARRY];
  }

  if (role === 'filler') {
    if (energyAvailable >= 1300 || numberOfCreeps >= 1) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
    } else if (energyAvailable >= 1000) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
    } else if (energyAvailable >= 700) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
    } else {
      bodyParts = [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY];
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

  if (role === 'reserver') {
    bodyParts = [MOVE, MOVE, CLAIM, CLAIM];
  }

  if (role === 'defender') {
    if (energyCapacityAvailable >= 1690) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK];
    } else {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK];
    }
  }

  if (role === 'settler') {
    if (numberOfCreeps >= 4 && energyCapacityAvailable >= 1000) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY];
    } else if (numberOfCreeps >= 4 && energyCapacityAvailable >= 800) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY];
    } else if (numberOfCreeps >= 4 && energyCapacityAvailable >= 600) {
      bodyParts = [MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY, CARRY, CARRY];
    } else if (numberOfCreeps >= 4 && energyCapacityAvailable >= 400) {
      bodyParts = [MOVE, MOVE, WORK, WORK, CARRY, CARRY];
    } else {
      bodyParts = [MOVE, WORK, CARRY];
    }
  }

  if (role === 'suicide') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
  }

  if (role === 'destroyer') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
  }

  if (role === 'scout') {
    bodyParts = [MOVE];
  }

  if (role === 'upgrader' || role === 'remoteMiner' || role === 'builder') {
    if (energyCapacityAvailable >= 1800) {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
    } else {
      bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
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

const spawnCreep = (role: string, spawn: StructureSpawn, creeps: Creep[], jobs?: Job[]) => {
  const energyAvailable = spawn.room.energyAvailable;
  const energyCapacityAvailable = spawn.room.energyCapacityAvailable;
  const bodyParts = configureCreep(role, energyAvailable, energyCapacityAvailable, creeps.length);
  const newName = role + Game.time;
  let jobIndex;

  if (jobs) {
    jobIndex = getJobIndex(creeps, jobs);
  }

  spawn.spawnCreep(bodyParts, newName, {
    memory: {
      role,
      working: false,
      jobIndex,
      room: spawn.room.name,
    }
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
        runner: roleFiller
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
        runner: roleTransport
      },
      {
        role: 'defender',
        minimum: (
          spawn.room.find(FIND_HOSTILE_CREEPS).length > 0
        ) ? 1 : 0,
        runner: roleDefender
      },
      {
        role: 'repair',
        minimum: 1,
        runner: roleRepair
      },
      {
        role: 'upgrader',
        minimum: (
          spawn.room.storage && spawn.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 100000
        ) ? 4 : 0,
        runner: roleUpgrader
      },
      {
        role: 'builder',
        minimum: (
          spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0 ||
          spawn.room.find(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_RAMPART || s.structureType === STRUCTURE_WALL) && s.hits < (3000000 * 0.9)
          }).length > 0
        ) ? 1 : 0,
        runner: roleBuilder
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
        runner: roleColonizer
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
        runner: roleFounder
      },
      {
        role: 'destroyer',
        minimum: 0,
        runner: roleDestroyer
      },
      {
        role: 'reserver',
        minimum: (() => {
          const room = Object.values(Game.rooms).find((room) => room.name === 'E11N38');

          if (
            room === undefined ||
            (
              room &&
              room.controller &&
              (
                room.controller.reservation === undefined ||
                (
                  room.controller.reservation &&
                  room.controller.reservation.ticksToEnd < 4500
                )
              )
            )
          ) {
            return 1;
          } else {
            return 0;
          }
        })(),
        runner: roleReserver,
        jobs: [
          {
            roomName: 'E11N38'
          }
        ]
      },
      {
        role: 'remoteMiner',
        minimum: (() => {
          const room = Object.values(Game.rooms).find((room) => room.name === 'E11N38');

          if (
            room &&
            room.controller &&
            room.controller.reservation
          ) {
            return 2;
          } else {
            return 0;
          }
        })(),
        runner: roleRemoteMiner,
        jobs: [
          {
            roomName: 'E11N38'
          },
          {
            roomName: 'E11N38'
          }
        ]
      },
      {
        role: 'suicide',
        minimum: (() => {
          const room = Object.values(Game.rooms).find((room) => room.name === 'E11N38');

          if (room) {
            const containers = room.find(FIND_STRUCTURES, {
              filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.getUsedCapacity(RESOURCE_ENERGY) > 0
            });

            if (containers.length) {
              return 6;
            } else {
              return 0;
            }
          } else {
            return 0;
          }
        })(),
        runner: roleSuicide
      },
    ];
  } else if (spawnName === 'Spawn2') {
    return [
      {
        role: 'filler',
        minimum: 1,
        runner: roleFiller
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
        runner: roleTransport
      },
      {
        role: 'defender',
        minimum: (
          spawn.room.find(FIND_HOSTILE_CREEPS).length > 0
        ) ? 1 : 0,
        runner: roleDefender
      },
      {
        role: 'repair',
        minimum: 1,
        runner: roleRepair
      },
      {
        role: 'upgrader',
        minimum: (
          spawn.room.storage && spawn.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 100000
        ) ? 2 : 0,
        runner: roleUpgrader
      },
      {
        role: 'builder',
        minimum: (
          spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0 ||
          spawn.room.find(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_RAMPART || s.structureType === STRUCTURE_WALL) && s.hits < 3000000
          }).length > 0
        ) ? 1 : 0,
        runner: roleBuilder
      },
    ]
  } else if (spawnName === 'Spawn3') {
    return [
      {
        role: 'settler',
        minimum: 0,
        runner: roleSettler
      },
      {
        role: 'filler',
        minimum: 1,
        runner: roleFiller
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
        runner: roleTransport
      },
      {
        role: 'defender',
        minimum: (
          spawn.room.find(FIND_HOSTILE_CREEPS).length > 0
        ) ? 1 : 0,
        runner: roleDefender
      },
      {
        role: 'repair',
        minimum: 1,
        runner: roleRepair
      },
      {
        role: 'upgrader',
        minimum: (
          spawn.room.storage && spawn.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 100000
        ) ? 2 : 0,
        runner: roleUpgrader
      },
      {
        role: 'builder',
        minimum: (
          spawn.room.find(FIND_CONSTRUCTION_SITES).length > 0 ||
          spawn.room.find(FIND_STRUCTURES, {
            filter: s => (s.structureType === STRUCTURE_RAMPART || s.structureType === STRUCTURE_WALL) && s.hits < 3000000
          }).length > 0
        ) ? 2 : 0,
        runner: roleBuilder
      },
    ]
  } else {
    console.log('Unexpected spawnName');
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
      const shouldSpawnFiller = (
        (role === 'filler' && creeps.length === 1 && creeps[0].ticksToLive) ? (creeps[0].ticksToLive < 100 || creeps[0].getActiveBodyparts(CARRY) < 10) : false
      );

      if (spawn.spawning === null && (creeps.length < minimum || shouldSpawnFiller)) {
        spawnCreep(role, spawn, creeps, jobs);
      }

      creeps.forEach((creep) => {
        if (jobs && creep.memory.jobIndex !== undefined) {
          runner(creep, jobs[creep.memory.jobIndex]);
        } else {
          runner(creep);
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


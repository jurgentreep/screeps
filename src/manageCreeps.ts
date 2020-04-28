import { roleHarvester } from "roles/harvester";
import { roleUpgrader } from "roles/upgrader";
import { roleSpecial } from "roles/special";
import { roleRepair } from "roles/repair";
import { roleTransfer } from "roles/transfer";
import { roleColonizer } from "roles/colonizer";
import { roleFounder } from "roles/founder";
import { roleDefender } from "roles/defender";
import { roleSettler } from "roles/settler";
import { roleSuicide } from "roles/suicide";
import { roleDestroyer } from "roles/destroyer";

export const configureCreep = (role: string, energyAvailable: number) => {
  // Upgraders
  let bodyParts: BodyPartConstant[] = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];

  if (role === 'transfer') {
    bodyParts = [MOVE, CARRY];
  }

  if (role === 'harvester') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];

    if (energyAvailable < 600) {
      bodyParts = [MOVE, MOVE, MOVE, CARRY, CARRY, CARRY];
    }
  }

  if (role === 'special') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY];
  }

  if (role === 'repair') {
    bodyParts = [WORK, CARRY, MOVE, MOVE];
  }

  if (role === 'colonizer') {
    bodyParts = [MOVE, MOVE, CLAIM, CLAIM];
  }

  if (role === 'defender') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK];
  }

  if (role === 'settler') {
    bodyParts = [MOVE, WORK, CARRY];
  }

  if (role === 'suicide') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
  }

  if (role === 'destroyer') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK];
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
  const bodyParts = configureCreep(role, energyAvailable);
  const newName = role + Game.time;
  const jobIndex = getJobIndex(creeps, jobs);

  spawn.spawnCreep(bodyParts, newName, {
    memory: {
      role,
      working: false,
      jobIndex,
      room: spawn.room.name,
    },
    // directions: [BOTTOM],
  });
}

const getRoles = (spawn: StructureSpawn): Role[] => {
  const spawnName = spawn.name;

  if (spawnName === 'Spawn1') {
    return [
      {
        role: 'transfer',
        minimum: 1,
        runner: roleTransfer,
        jobs: [
          {
            linkId: '5e9f1ef4b23f556e388f4cc0' as Id<StructureLink>
          }
        ]
      },
      {
        role: 'harvester',
        minimum: 1,
        runner: roleHarvester,
        jobs: [
          {
            spawn
          }
        ]
      },
      {
        role: 'special',
        minimum: 2,
        runner: roleSpecial,
        jobs: [
          {
            sourceId: '5bbcad9c9099fc012e63782c' as Id<Source>,
            linkId: '5e9f1bea55e44a5c555d9240' as Id<StructureLink>,
            containerId: '5e9c64a3ca9187de7ee861eb' as Id<StructureContainer>
          },
          {
            sourceId: '5bbcad9c9099fc012e63782b' as Id<Source>,
            containerId: '5ea44320fc04d6d37a191992' as Id<StructureContainer>
          }
        ]
      },
      {
        role: 'repair',
        minimum: 1,
        runner: roleRepair,
        jobs: []
      },
      {
        role: 'upgrader',
        minimum: 3,
        runner: roleUpgrader,
        jobs: [
          {
            linkId: '5ea44320fc04d6d37a191992' as Id<StructureLink>,
            containerId: '5ea446a16586591e643f21f1' as Id<StructureContainer>
          },
          {
            linkId: '5ea44320fc04d6d37a191992' as Id<StructureLink>,
            containerId: '5ea446a16586591e643f21f1' as Id<StructureContainer>
          },
          {
            linkId: '5ea44320fc04d6d37a191992' as Id<StructureLink>,
            containerId: '5ea446a16586591e643f21f1' as Id<StructureContainer>
          },
          {
            linkId: '5ea44320fc04d6d37a191992' as Id<StructureLink>,
            containerId: '5ea446a16586591e643f21f1' as Id<StructureContainer>
          },
          {
            linkId: '5ea44320fc04d6d37a191992' as Id<StructureLink>,
            containerId: '5ea446a16586591e643f21f1' as Id<StructureContainer>
          },
        ]
      },
      {
        role: 'colonizer',
        minimum: 0,
        runner: roleColonizer,
        jobs: []
      },
      {
        role: 'founder',
        minimum: 0,
        runner: roleFounder,
        jobs: []
      },
      {
        role: 'defender',
        minimum: 0,
        runner: roleDefender,
        jobs: []
      },
      {
        role: 'suicide',
        minimum: 0,
        runner: roleSuicide,
        jobs: []
      },
      {
        role: 'destroyer',
        minimum: 0,
        runner: roleDestroyer,
        jobs: []
      },
    ];
  } else if (spawnName === 'Spawn2') {
    return [
      {
        role: 'transfer',
        minimum: 1,
        runner: roleTransfer,
        jobs: [
          {
            linkId: '5ea5f555ae67a29d4d08f25a' as Id<StructureLink>
          }
        ]
      },
      {
        role: 'harvester',
        minimum: 1,
        runner: roleHarvester,
        jobs: [
          {
            spawn
          }
        ]
      },
      {
        role: 'settler',
        minimum: 0,
        runner: roleSettler,
        jobs: [
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
          {
            spawn,
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
          },
        ]
      },
      {
        role: 'special',
        minimum: 1,
        runner: roleSpecial,
        jobs: [
          {
            sourceId: '5bbcad8a9099fc012e6376a4' as Id<Source>,
            linkId: '5ea5ff1790352e1caf2ddd5b' as Id<StructureLink>,
            containerId: '5ea60434454e1c1dd40aa457' as Id<StructureContainer>
          },
        ]
      },
      {
        role: 'repair',
        minimum: 1,
        runner: roleRepair,
        jobs: []
      },
      {
        role: 'upgrader',
        minimum: 1,
        runner: roleUpgrader,
        jobs: [
          {},
          {},
          {},
          {},
          {},
        ]
      },
    ]
  } else {
    console.error('Unexpected spawnName');
    return [];
  }
}

export const manageCreeps = (spawn: StructureSpawn) => {
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
      if (creep.memory.jobIndex !== undefined) {
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
}


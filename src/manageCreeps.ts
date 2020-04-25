import { roleHarvester } from "roles/harvester";
import { roleUpgrader } from "roles/upgrader";
import { roleSpecial } from "roles/special";
import { roleRepair } from "roles/repair";
import { roleTransfer } from "roles/transfer";
import { roleColonizer } from "roles/colonizer";
import { roleFounder } from "roles/founder";
import { roleDefender } from "roles/defender";
import { roleSettler } from "roles/settler";
import { roleMegaHauler } from "roles/megaHauler";

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
    bodyParts = [MOVE, CLAIM];
  }

  if (role === 'defender') {
    bodyParts = [MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, ATTACK];
  }

  if (role === 'settler') {
    bodyParts = [MOVE, WORK, CARRY];
  }

  return bodyParts;
}

const getJobIndex = (creeps: Creep[], jobs: SpecialJob[]) => {
  const jobIndexes = jobs.map((value, index) => index);
  const takenJobs = creeps.map(creep => creep.memory.jobIndex);
  const availableJobs = jobIndexes.filter(jobIndex => !takenJobs.includes(jobIndex));
  return availableJobs[0];
}

const spawnCreep = (role: string, spawn: StructureSpawn, creeps: Creep[], jobs: SpecialJob[]) => {
  const energyAvailable = spawn.room.energyAvailable;
  const bodyParts = configureCreep(role, energyAvailable);
  const newName = role + Game.time;
  const jobIndex = getJobIndex(creeps, jobs);

  spawn.spawnCreep(bodyParts, newName, {
    memory: {
      role,
      working: false,
      jobIndex
    },
    directions: [BOTTOM],
  });
}

const getRoles = (spawnName: string) => {
  if (spawnName === 'Spawn1') {
    return [
      {
        role: 'transfer',
        minimum: 1,
        runner: roleTransfer,
        jobs: []
      },
      {
        role: 'harvester',
        minimum: 1,
        runner: roleHarvester,
        jobs: []
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
        minimum: 5,
        runner: roleUpgrader,
        jobs: []
      },
      {
        role: 'colonizer',
        minimum: 0,
        runner: roleColonizer,
        jobs: []
      },
      {
        role: 'founder',
        minimum: 3,
        runner: roleFounder,
        jobs: []
      },
      {
        role: 'defender',
        minimum: 1,
        runner: roleDefender,
        jobs: []
      },
      {
        role: 'megaHauler',
        minimum: 0,
        runner: roleMegaHauler,
        jobs: []
      }
    ];
  } else if (spawnName === 'Spawn2') {
    return [
      {
        role: 'settler',
        minimum: 10,
        runner: roleSettler,
        jobs: []
      },
    ]
  } else {
    console.error('Unexpected spawnName');
    return [];
  }
}

export const manageCreeps = (spawn: StructureSpawn) => {
  const initialRoles = getRoles(spawn.name);

  const roles = initialRoles.map(({ role, ...rest }) => ({
    ...rest,
    role,
    creeps: _.filter(Game.creeps, (creep) => creep.memory.role === role)
  }));

  roles.forEach(({ role, minimum, runner, creeps, jobs }) => {
    if (creeps.length < minimum) {
      spawnCreep(role, spawn, creeps, jobs);
    }

    creeps.forEach((creep) => {
      if (creep.memory.jobIndex) {
        runner(creep, jobs[creep.memory.jobIndex]);
      } else {
        runner(creep, jobs[0]);
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


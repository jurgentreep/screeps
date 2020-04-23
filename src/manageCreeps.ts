import { roleHarvester } from "roles/harvester";
import { roleUpgrader } from "roles/upgrader";
import { roleSpecial } from "roles/special";
import { roleRepair } from "roles/repair";
import { roleTransfer } from "roles/transfer";
import { roleColonizer } from "roles/colonizer";
import { roleFounder } from "roles/founder";
import { roleDefender } from "roles/defender";
import { roleSettler } from "roles/settler";

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
    bodyParts = [MOVE, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY];
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

  return bodyParts;
}

const spawnCreep = (role: string, room: Room, spawn: StructureSpawn) => {
  const energyAvailable = room.energyAvailable;
  const bodyParts = configureCreep(role, energyAvailable);
  const newName = role + Game.time;
  spawn.spawnCreep(bodyParts, newName, {
    memory: {
      role,
      working: false,
    },
    directions: [BOTTOM],
  });
}

export const manageCreeps = (room: Room, spawn: StructureSpawn) => {
  if (spawn.name === 'Spawn1') {
    const initialRoles = [
      {
        role: 'transfer',
        minimum: 1,
        runner: roleTransfer
      },
      {
        role: 'harvester',
        minimum: 1,
        runner: roleHarvester
      },
      {
        role: 'special',
        minimum: 1,
        runner: roleSpecial
      },
      {
        role: 'repair',
        minimum: 1,
        runner: roleRepair
      },
      {
        role: 'upgrader',
        minimum: 3,
        runner: roleUpgrader
      },
      {
        role: 'colonizer',
        minimum: 0,
        runner: roleColonizer
      },
      {
        role: 'founder',
        minimum: 3,
        runner: roleFounder
      },
      {
        role: 'defender',
        minimum: 1,
        runner: roleDefender
      }
    ];

    const roles = initialRoles.map(({ role, ...rest }) => ({
      ...rest,
      role,
      creeps: _.filter(Game.creeps, (creep) => creep.memory.role === role)
    }));

    roles.forEach(({ role, minimum, runner, creeps }) => {
      if (creeps.length < minimum) {
        spawnCreep(role, room, spawn);
      }

      creeps.forEach((creep) => {
        runner(creep);
      });
    });
  } else if (spawn.name === 'Spawn2') {
    // manage creeps of Spawn2
    const newName = 'settler' + Game.time;

    spawn.spawnCreep([MOVE, WORK, CARRY], newName, {
      memory: {
        role: 'settler',
        working: false,
      },
      directions: [BOTTOM],
    });

    const creeps = _.filter(Game.creeps, (creep) => creep.memory.role === 'settler');

    creeps.forEach(creep => roleSettler(creep));
  }

  if (spawn.spawning) {
    var spawningCreep = Game.creeps[spawn.spawning.name];
    room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      spawn.pos.x + 1,
      spawn.pos.y,
      { align: 'left', opacity: 0.8 });
  }
}


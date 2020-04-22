import { roleHarvester } from "roles/harvester";
import { roleUpgrader } from "roles/upgrader";
import { roleSpecial } from "roles/special";
import { roleRepair } from "roles/repair";
import { roleTransfer } from "roles/transfer";

export const configureCreep = (role: string, energyAvailable: number) => {
  // Upgraders
  let bodyParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];

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

  if (spawn.spawning) {
    var spawningCreep = Game.creeps[spawn.spawning.name];
    room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      spawn.pos.x + 1,
      spawn.pos.y,
      { align: 'left', opacity: 0.8 });
  }
}


// example declaration file - remove these and add your own custom typings

// Shim to allow continued use of global lodash without having to explicitley import in every file.
// as of @types/lodash@3.10.3
import _ from "lodash";
declare global {
  const _: typeof _;

  // memory extension samples
  interface CreepMemory {
    role: string;
    working: boolean;
    jobIndex?: number;
  }

  interface SpecialJob {
    sourceId: Id<Source>
    linkId?: Id<StructureLink>
    containerId: Id<StructureContainer>
  }

  interface UpgradeJob {
    linkId: Id<StructureLink>
    containerId: Id<StructureContainer>
  }

  type Job = SpecialJob | UpgradeJob;

  type Role = {
    role: 'special'
    minimum: number
    runner: (creep: Creep, job: SpecialJob) => void
    jobs: SpecialJob[]
  } | {
    role: 'upgrader'
    minimum: number
    runner: (creep: Creep, job: UpgradeJob) => void
    jobs: UpgradeJob[]
  } | {
    role: 'transfer' |
    'harvester' |
    'repair' |
    'colonizer' |
    'founder' |
    'defender' |
    'megaHauler' |
    'settler'
    minimum: number
    runner: (creep: Creep) => void
    jobs: any[]
  }
}

interface Memory {
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}

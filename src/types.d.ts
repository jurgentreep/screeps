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
    room: string;
  }

  interface SpecialJob {
    sourceId: Id<Source>
    linkId?: Id<StructureLink>
    containerId: Id<StructureContainer>
  }

  interface UpgradeJob {
    linkId?: Id<StructureLink>
    containerId?: Id<StructureContainer>
  }

  interface TransferJob {
    linkId: Id<StructureLink>
  }

  type Job = SpecialJob | UpgradeJob | TransferJob;

  type Role = {
    role: 'special'
    minimum: number
    runner: (creep: Creep, job?: SpecialJob) => void
    jobs: SpecialJob[]
  } | {
    role: 'upgrader'
    minimum: number
    runner: (creep: Creep, job?: UpgradeJob) => void
    jobs?: UpgradeJob[]
  } | {
    role: 'transfer'
    minimum: number
    runner: (creep: Creep, job?: TransferJob) => void
    jobs: TransferJob[]
  } | {
    role: 'repair' |
    'colonizer' |
    'founder' |
    'defender' |
    'suicide' |
    'destroyer' |
    'remoteMiner' |
    'builder' |
    'scout' |
    'transport' |
    'settler' |
    'filler'
    minimum: number
    runner: (creep: Creep, job?: any) => void
    jobs?: any[]
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

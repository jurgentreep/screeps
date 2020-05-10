export const roleReserver = (creep: Creep, job?: ReserverJob) => {
  if (job) {
    if (creep.room.name === job.roomName) {
      if (creep.room.controller) {
        const result = creep.reserveController(creep.room.controller)

        if (result === ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
        } else if (result !== OK) {
          console.log(`${creep.name} can't reserver the controller, result code: ${result}`);
        }
      } else {
        console.log(`${creep.name} can't find a controller`);
      }
    } else {
      creep.moveTo(new RoomPosition(25, 25, job.roomName));
    }
  } else {
    console.log(`${creep.name} can't function without a job`);
  }
}

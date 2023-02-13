find_energy(creep: Harvester): Boolean {
  const sources: Source[] = creep.room.find(FIND_SOURCES);
  if (sources.length == 0) {
    return false;
  }
  const source = sources.pop();
  if (source == undefined) {
    return false;
  }
  creep.memory.source = source.pos;
  return true;
}


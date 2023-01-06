/**
 * @param pos position of the structure you want to build around for example spawn
 * @returns [x pos , y pos, A structure constant]
 * Return absolute positions based on the passed position. 
 */
function building_layout(pos: RoomPosition): [number, number, string] {
  let next_structure_site = gcl_lv2_structures(1)!;
  next_structure_site[0] = next_structure_site[0] + pos.x;
  next_structure_site[1] = next_structure_site[1] + pos.y;

  return next_structure_site;
}

function gcl_lv2_structures(nr: number) {
  const structure = new Map<number, [number, number, string]>([
    [1, [+1, -1, "extension"]],
    [2, [+0, -2, "extension"]]
  ]);
  const arr = structure.get(nr);
  return arr;
}
export { building_layout };

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

/**
 *
 * @param nr
 * @returns
 * At GCL lvl 2;
 *   - 5 extensions are possible
 */
function gcl_lv2_structures(nr: number) {
  const structure = new Map<number, [number, number, string]>([
    [1, [+1, -1, "extension"]],
    [2, [+0, -2, "extension"]]
  ]);
  const arr = structure.get(nr);
  return arr;
}

/**
 *
 * @returns an array with a relative x and Y position marked for extensions
 */
function* gcl_lvl2_extensions(): Generator<[number, number, string], any, unknown> {
  yield [+1, -1, "extension"];
  yield [+2, +0, "extension"];
  yield [+3, +0, "extension"];
  yield [+3, -1, "extension"];
  yield [+3, +1, "extension"];
  yield [+3, +2, "extension"];
}

export { building_layout, gcl_lvl2_extensions };

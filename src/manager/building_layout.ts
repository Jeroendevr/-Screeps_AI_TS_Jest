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

function extension_layout(pos: RoomPosition) {
  while (!gcl_lvl2_extensions().next().done) {
    let extension_gen = gcl_lvl2_extensions().next().value;
    extension_gen[0] = extension_gen[0] + pos.x;
    extension_gen[1] = extension_gen[1] + pos.y;
    return extension_gen;
  }

  throw new Error("could not found a new extension layout");
}

/**
 *
 * @returns an array with a relative x and Y position marked for extensions
 */
function* gcl_lvl2_extensions() {
  const extension_locations: [number, number, string][] = [
    [+1, -1, "extension"],
    [+2, +0, "extension"]
  ];
  const i = 0;
  while (i < extension_locations.length) {
    yield extension_locations[i];
  }
  return extension_locations[i];
}

const string_gen = return_string();

const hi: string = string_gen.next().value;

function* return_string() {
  yield "hello";
  return "no result";
}

export { building_layout, extension_layout };

import { Koerier } from "../roles/koerier";

export function move_opposite_direction(direction: number, creep: Koerier) {
    if (direction == TOP_RIGHT) {
        creep.move(LEFT);
    }
}

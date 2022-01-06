/** @param { Game } **/

function countRole(role: string): number {
    const rollers = Object.values(Game.creeps).filter(creep => creep.memory.role === role).length
    return rollers
}

export {
    countRole,
}

# Spawning

```{note}
TODO make use of extension energy to spawn better creep.
```

## Spawning options

A creep can be spawned using different types of logic. The following distictions can be made

- Based on current energy count
- Bases on maximum energy count
- Based on predefined bodies per role

### Current energy count

A spawn need or can spawn a creep, look at the available energy and use it as much as possible to create the biggest creep for the role that is requested.

### Maximum energy count

Wait unitl energy is (almost)full and then spawn the biggest creep possible

### Predifined bodies per role

Each role has gradually increasing bodies and if a spawn is not busy, spawn the biggest creep from a list.

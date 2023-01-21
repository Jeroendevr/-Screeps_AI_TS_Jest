# Room Communications

<!-- mermaid does not yet support the syntax of the <<Create>> for listing constructors so using the tilde a.t.m.-->

```{mermaid}
classDiagram
    note "main.ts run_owned_rooms"
    ConstructionManager *-- RoomComms

    class ConstructionManager {
        +~Create~ new ConstructionManager(room) ConstructionManager
        +run()
        -extensions()
        -find_suitable_extension_site(spawn_pos, roomName)
    }

    class RoomComms{
        +Bool construction_sites_wanted
        +~Create~ new RoomComms(room_name)

    }
```

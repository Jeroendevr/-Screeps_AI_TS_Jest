# Room Communications

<!-- mermaid does not yet support the syntax of the <<Create>> for listing constructors so using the tilde '~Create~ new' a.t.m.-->

```{mermaid}
classDiagram
    note "main.ts run_owned_rooms"
    ConstructionManager *-- RoomComms
    BuilderClass *-- RoomComms
    RoomManager <|-- RoomComms : Extends

    class ConstructionManager {
        +~Create~ new ConstructionManager(room) ConstructionManager
        +run()
        -extensions()
        -find_suitable_extension_site(spawn_pos, roomName)
    }

    class RoomManager {

    }
    class RoomComms{
        +Boolean construction_sites_wanted
        +~Create~ new RoomComms(room_name)

    }

    class BuilderClass {
        +run()
        +construction_site_available() Boolean
    }
```

export default {
    system: {
        states: ["game", "test"]
    },
    game: {
        state: {
            entities: ["viewport", "input"]
        }
    },
    viewport: {
        resize: {
            width: 300,
            height: 150,
            minWidth: 256,
            minHeight: 256
        }
    },
    input: {
        pointer: {}
    },
    player: {
        fillrect: {
            fill: "white",
            x: 8,
            y: 8,
            width: 240,
            height: 240
        },
        sound: {
            melody: ["8C3", "8D3", "8G3+8"]
        },
        data: {
            nClicks: 0
        }
    },
    enemy: {
        fillrectx: {
            fill: "white",
            x: 8,
            y: 8,
            width: 240,
            height: 240
        },
        sound: {
            melody: ["8G3", "8D3", "4C3"]
        }
    },
    test: {
        state: {
            entities: ["player"]
        }
    },
    testx: {
        state: {
            entities: ["enemy"]
        }
    }
};

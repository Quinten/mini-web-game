export default {
    system: {
        states: ['game', 'test']
    },
    game: {
        state: {
            entities: ['viewport', 'input']
        }
    },
    viewport: {
        canvas: {
            minWidth: 256,
            minHeight: 256
        }
    },
    input: {
        pointer: {}
    },
    bulboff: {
        bulb: {
            fill: 'gray',
            x: 8,
            y: 8,
            width: 240,
            height: 240,
            next: ['game', 'testx']
        },
        sound: {
            melody: ['8G3', '8D3', '4C3']
        },
        data: {
            nClicks: 0
        }
    },
    bulbon: {
        bulb: {
            fill: 'white',
            x: 8,
            y: 8,
            width: 240,
            height: 240,
            next: ['game', 'test']
        },
        sound: {
            melody: ['8C3', '8D3', '8G3+8'],
            play: true
        },
        data: {
            nClicks: 0
        }
    },
    test: {
        state: {
            entities: ['bulboff']
        }
    },
    testx: {
        state: {
            entities: ['bulbon']
        }
    }
};

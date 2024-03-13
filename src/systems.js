import entities from './entities.js';
import 'mini-web-game-components' as components;

let systems = {};
let systemTypes = [
    'preupdate',
    'update',
    'postupdate',
    'draw'
];
systemTypes.forEach(system => {
    systems[system] = {};
});

Object.keys(components).forEach(comp => {
    systemTypes.forEach(sys => {
        if (components[comp][sys] !== undefined) {
            systems[sys][comp] = components[comp][sys];
        }
    });
});

export default Object.freeze({
    systems,
    systemTypes
});

import icons from './icons.js';
icons.addIcons();

try {
    if (process.env.NODE_ENV === 'production') {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', e => {
                navigator.serviceWorker.register(
                    new URL('./sw.js', import.meta.url),
                    {type: 'module'}
                );
            });
        }
    }
} catch (err) {}

import entities from './entities.js';
import systemsModule from './systems.js';

let {systems, systemTypes} = systemsModule;

let calls = {};

let ctx = canvas.getContext('2d');
let timer = 0;
let delta = 0;
let onF = time => {
    delta = time - timer;
    timer = time;
    //console.log(delta);

    systemTypes.forEach(sys => {
        calls[sys] = [];
    });

    entities.system.states.forEach(stateId => {
        entities[stateId].state.entities.forEach(id => {
            let entity = entities[id];
            Object.keys(entity).forEach(comp => {
                let component = entity[comp];
                systemTypes.forEach(sys => {
                    if (systems[sys][comp] !== undefined) {
                        calls[sys].push({
                            system: systems[sys][comp],
                            c: {
                                entities,
                                id,
                                entity,
                                comp,
                                component,
                                stateId,
                                delta,
                                time,
                                ctx
                            }
                        });
                    }
                });
            });
        });
    });

    systemTypes.forEach(systemType => {
        calls[systemType].forEach(call => {
            let {system, c} = call;
            system(c);
        });
    });

    requestAnimationFrame(onF);
};
onF(0);

export default {};

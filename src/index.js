import entities from './entities.js';
import {components} from 'mini-web-game-components';
import customComponents from './components';
import {system} from 'mini-web-game-system';

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

let allComponents = {...components, ...customComponents};
system.game(entities, allComponents);

export default {};

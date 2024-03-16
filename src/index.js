import entities from './entities.js';
import {components} from 'mini-web-game-components';
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

system.game(entities, components);

export default {};

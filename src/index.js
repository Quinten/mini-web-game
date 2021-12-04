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

export default {};

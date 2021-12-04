import soundSystem from './sound.js';

let wasPointing = false;
let setupDone = false;

let doSetup = c => {
    let pointer = c.component;
    let resize = c.entities.viewport.resize;
    let viewportOffset;
    let left;
    let top;
    let adjust;
    let mouseEntered = false;
    let x = 0;
    let y = 0;

    let setXY = e => {
        viewportOffset = canvas.getBoundingClientRect();
        left = viewportOffset.left;
        top = viewportOffset.top;
        adjust = resize.zoom / window.devicePixelRatio;
        x = (e.clientX - left) / adjust;
        y = (e.clientY - top) / adjust;
        pointer.x = x;
        pointer.y = y;
    };

    canvas.addEventListener('pointerdown', e => {
        if (e.isPrimary === false) {
            return;
        }
        setXY(e);
        pointer.downX = x;
        pointer.downY = y;
        pointer.justDown = true;
        pointer.isDown = true;
        mouseEntered = false;
        soundSystem.initCtx();
    });

    canvas.addEventListener('pointermove', e => {
        if (e.isPrimary === false) {
            return;
        }
        setXY(e);
    });

    canvas.addEventListener('pointerup', e => {
        if (mouseEntered) {
            mouseEntered = false;
            return;
        }
        if (e.isPrimary === false) {
            return;
        }
        setXY(e);
        pointer.justUp = true;
        pointer.isDown = false;
    });

    canvas.addEventListener('pointerout', e => {
        if (pointer.isDown) {
            pointer.justUp = true;
            pointer.isDown = false;
        }
    });

    canvas.addEventListener('pointerenter', e => {
        mouseEntered = true;
    });
};

let preupdate = c => {
    if (setupDone === false) {
        doSetup(c);
        setupDone = true;
    }
    let {component} = c;
    wasPointing = component.pointing;
    component.pointing = false;
};

let postupdate = c => {
    let {component} = c;

    component.justDown = false;
    component.justUp = false;

    if (wasPointing && !component.pointing) {
        canvas.style.cursor = 'default';
    } else if (!wasPointing && component.pointing) {
        canvas.style.cursor = 'pointer';
    }
};

export default Object.freeze({
    preupdate,
    postupdate
});

let w = 0;
let h = 0;
let targetRatio = 1;
let actualRatio = 1;
let zoom = 1;

let preupdate = c => {
    if (w === window.innerWidth && h === window.innerHeight) {
        return;
    }
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    let {component} = c;
    component.width = w;
    component.height = h;
    targetRatio = component.minWidth / component.minHeight;
    actualRatio = w / h;
    if (targetRatio < actualRatio) {
        zoom = canvas.height / component.minHeight;
    } else {
        zoom = canvas.width / component.minWidth;
    }
    component.zoom = zoom;
};

let flush = c => {
    let {ctx} = c;
    ctx.restore();
    ctx.save();
    ctx.scale(zoom, zoom);
};

let draw = c => {
    let {ctx} = c;
    flush(c);
    ctx.clearRect(0, 0, w, h);
};

export default Object.freeze({
    preupdate,
    draw,
    flush
});

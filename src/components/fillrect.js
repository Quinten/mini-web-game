let update = c => {
    let {pointer} = c.entities.input;
    let {component, entity} = c;
    let {x, y, width, height} = component;
    if (
        pointer.x < x || pointer.x > width + x
        || pointer.y < y || pointer.y > height + y
    ) {
        return;
    }
    pointer.pointing = true;
    component.fill = (pointer.isDown) ? 'lightblue' : 'white';
    if (pointer.justUp && entity.sound !== undefined) {
        entity.sound.play = true;
    }
    if (pointer.justUp) {
        entity.data.nClicks = entity.data.nClicks + 1;
        c.entities.system.states = ['game', 'testx'];
    }
};

let draw = c => {
    let {ctx} = c;
    let {x, y, width, height, fill} = c.component;
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, width, height);
};

export default Object.freeze({
    draw,
    update
});

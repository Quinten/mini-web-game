let update = c => {
    let {component, entities, entity} = c;
    let {pointer} = entities.input;
    let {x, y, width, height} = component;
    if (
        pointer.x < x || pointer.x > width + x
        || pointer.y < y || pointer.y > height + y
    ) {
        return;
    }
    pointer.pointing = true;
    if (pointer.justUp && entity.sound !== undefined) {
        entity.sound.play = true;
    }
    if (pointer.justUp) {
        if (entity.data !== undefined && entity.data.nClicks !== undefined) {
            entity.data.nClicks = entity.data.nClicks + 1;
        }
        entities.system.states = component.next;
    }
};

let draw = c => {
    let {component, ctx} = c;
    let {x, y, width, height, fill} = component;
    ctx.fillStyle = fill;
    ctx.fillRect(x + width*5/16, y + height/2, width*3/8, height/2);
    ctx.beginPath();
    ctx.arc(x + width/2, y + height*13/32, width*13/32, 0, Math.PI * 2);
    ctx.fill();
};

export default Object.freeze({
    draw,
    update
});

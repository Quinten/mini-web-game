let iconDraw = (ctx) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(320, 512, 384, 512);
    ctx.beginPath();
    ctx.arc(512, 416, 416, 0, Math.PI * 2);
    ctx.fill();
};

export default Object.freeze({
    iconDraw
});

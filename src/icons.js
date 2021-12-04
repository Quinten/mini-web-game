let addIcons = _ => {
    let c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    let ctx = c.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(256, 256, 512, 512);
    let icon = c.toDataURL();
    let favi = document.createElement('link');
    favi.rel = 'icon';
    favi.type = 'image/png';
    favi.href = icon;
    document.head.appendChild(favi);
    let touch = document.createElement('link');
    touch.rel = 'apple-touch-icon';
    touch.href = icon;
    document.head.appendChild(touch);
    let name = document.title;
    let short_name = document.title;
    let description = document.querySelector('[name=description]').getAttribute('content');
    let theme_color = document.body.style.background;
    let tc = document.createElement('meta');
    tc.name = 'theme-color';
    tc.content = theme_color;
    document.head.appendChild(tc);
    let background_color = theme_color;
    let display = 'standalone';
    let start_url = window.location.href;
    let scope = start_url.replace(/[^/]+$/, '');
    let icons = [{src: icon, type: 'image/png', sizes: '1024x1024'}];
    let manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = 'data:application/json,' + JSON.stringify({
        name, short_name, description, background_color,
        theme_color, display, start_url, scope, icons
    });
    document.head.appendChild(manifest);
};

export default Object.freeze({
    addIcons
});

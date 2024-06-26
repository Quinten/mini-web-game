# Mini web game docs

Welcome to the mini‐web‐game documentation!

mini-web-game is a small template for web games. It uses an entity component system and is designed to be a starting point for small games and prototypes.

This template is built on top of two seperate npm packages [mini-web-game-system](https://github.com/Quinten/mini-web-game-system) and [mini-web-game-components](https://github.com/Quinten/mini-web-game-components). These packages are used to maintain the system and the base components respectively.

You can add your own components in the `src/components` folder. The `src/entities.js` file is used to structure the data of your game and display list.

[Parcel](https://parceljs.org/) is used as a build tool.

## Features

- Installable as PWA
- Entity Component System
- Responsive `canvas` component
- Persistent `data` component
- Mouse and touch controls with `pointer` component
- Sound and music with the `sound` component
- Graphics can be made with just code and also the favicon and pwa icons and even the sounds
- Uses the canvas 2d context (for the moment?)

## Things to mod

### Some variables to take care of

Change the title tag in `src/index.html` to the name of your project. This is used in the `manifest.json` and as prefix for `localStorage` keys.

The `description` meta tag in `src/index.html`. This will also be used in the `manifest.json`.

The inline `background` style of the `body` in `src/index.html`. This is also used to generate the `manifest.json`.

Change `cacheName` in `src/sw.js` to something unique. This is used to cache the pwa files.

### Changing the icon

Use `src/icon.js` to change the applications pwa icons and favicons. The canvas api is used to create the icon. The width and height of the icon is 1024 pixels.

### Adding data and objects to your game

Use `src/entities.js` to structure the data of your game and display list. The structure of the data is:

```
{
    entity_id_of_entity_A: {
        component_name_A: {
            property_A_of_component_A: some_value,
            property_B_of_component_A: some_value
        },
        component_name_B: {
            property_C_of_component_B: some_value,
            property_D_of_component_B: some_value
        }
    },
    entity_id_of_entity_B: {
        component_name_A: {
            property_A_of_component_A: some_other_value,
            property_B_of_component_A: some_other_value
        }
    }
}
```

One `system` entity with a `states` component is required to call all other systems. To hook up the responsive canvas and the mouse/touch input you can start with something like this:

```
{
    system: {
        states: ['game', 'myScene']
    },
    game: {
        state: {
            entities: ['viewport', 'input']
        }
    },
    viewport: {
        canvas: {
            minWidth: 256,
            minHeight: 256
        }
    },
    input: {
        pointer: {}
    },
    myBulb: {
        bulb: {
            fill: 'white',
            x: 8,
            y: 8,
            width: 240,
            height: 240,
            next: ['game']
        }
    },
    myScene: {
        state: {
            entities: ['myBulb']
        }
    }
}
```

This renders a white light bulb that dissapears when clicked. The line `next: ['game']` removes `myScene` from the active states.

### Adding logic

When you add a new component, do not forget to import and export it in `src/components/index.js`.

Use `src/components/bulb.js` as an example of how to create logic for your components. The most important component life cycle methods are:

1. preupdate
2. update
3. postupdate
4. pretransform
5. predraw
6. transform
7. draw
8. postdraw

A component doesn't need to export all of them. Mosty you will use `update` and `draw`.

Each lifecycle method has exactly one parameter `c` which is an object with the following keys:

- `entities` (the complete entities data structure)
- `id` (the id of the current entity)
- `entity` (the current entity)
- `comp` (the current component name)
- `component` (the current entity's component object with it's specific values)
- `stateId` (the id of the state)
- `delta` (time elapsed since last frame)
- `time` (time elapsed since start of the game)
- `ctx` (the canvas drawing context)
- `canvas` (the canvas element)

## Useful commands

Make sure you installed [node and npm](https://nodejs.org/en/).

```
npm install
```

Installs the necessary packages.

```
npm start
```

Starts a local development server.

```
npm run build
```

Makes a production build in the `public` folder.

```
npm run zip
```

Runs the build and then makes a zip. Also counts the bytes of the zip.

```
npm link mini-web-game-components mini-web-game-system
```

For core development, link the core packages to the project.

## Deploy to gh-pages with gh-actions

When pushing on the master branch, a build is deployed automatically to github pages. To make it run correctly, add a secret to the settings of your repo named `ACCESS_TOKEN`. This github token should have write permissions to repos.

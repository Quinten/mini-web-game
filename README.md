# mini-web-game

A mini web game generated from this [template](https://github.com/Quinten/mini-web-game).

Uses [parcel](https://parceljs.org/) as a build tool.

## Features

- Installable as PWA
- Entity Component System
- Responsive canvas `resize` component
- Persistent `data` component
- Mouse and touch controls with `pointer` component
- Sound and music with the `sound` component

No need to use a GUI editor for images or sound. You can write it in code. Even the icons for the PWA.

## Things to mod

### Some variables to take care of

The `name` in the `package.json`. This is used for the cache name of the service worker. Important if you upload a lot of games to the same domain.

The `title` in `src/index.html`. This is used to generate the `manifest.json` and as prefix for `localStorage` keys.

The `description`, `author` and `monetization` meta tags in `src/index.html`.

The inline `background` style of the `body` in `src/index.html`. This is also used to generate the `manifest.json`.

### Changing the icons

Use `src/icons.js` to change the applications pwa icons and favicons. This file uses the canvas api to create your icons.

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
        resize: {
            width: 300,
            height: 150,
            minWidth: 256,
            minHeight: 256
        }
    },
    input: {
        pointer: {}
    },
    mySquare: {
        fillrect: {
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
            entities: ['mySquare']
        }
    }
}
```

This renders a white square that dissapears when clicked. The line `next: ['game']` removes `myScene` from the active states.

### Adding logic

When you add a new component, do not forget to import and export it in `src/components/index.js`.

Use `src/components/fillrect.js` as an example of how to create logic for your components. The component life cycle methods you can use are:

1. preupdate
2. update
3. postupdate
4. draw

A component doesn't need to export all of them.

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

## Deploy to gh-pages with gh-actions

When pushing on the master branch, a build is deployed automatically to github pages. To make it run correctly, add a secret to the settings of your repo named `ACCESS_TOKEN`. This github token should have write permissions to repos.




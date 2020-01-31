import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';
import PreloadContext from './lib/PreloadContext';


function createPage(root, stateScript) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
            name="viewport"
            content="width=device-width,initial-scale=1,shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <title>React App</title>
        <link href="${manifest['main.css']}" rel="stylesheet" />
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
            ${root}
        </div>
        ${stateScript}
        <script src="${manifest['runtime~main.js']}"></script>
        ${thunks}
        <script src="${manifest['main.js']}"></script>
    </body>
    </html>
    `;
}

const app = express();

const serverRender = (req, res, next) => {
    
    const context = {};
    const store = createStore(rootReducer, applyMiddleware(thunk));

    const preloadContext = {
        done: false,
        promises: []
    };

    const jsx = (
        <PreloadContext.Provider value={preloadContext}>
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        </PreloadContext.Provider>
    );

    ReactDOMServer.renderToStaticMarkup(jsx);
    try {
        await Promise.all(preloadContext.promises);
    } catch(e) {
        return res.status(500);
    }
    preloadContext.done = true;
    const root = ReactDOMServer.renderToString(jsx);

    const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`;

    res.send(createPage(root, stateScript));
};


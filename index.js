var env = require('@babel/preset-env');
var react = require('@babel/preset-react');
var flow = require('@babel/preset-flow');
var transformRuntime = require('@babel/plugin-transform-runtime');
var transformClassProperties = require('@babel/plugin-proposal-class-properties');
var syntaxDynamicImport = require('@babel/plugin-syntax-dynamic-import');

module.exports = function(context, options) {
    options = options || {};

    var disabled = options.disabled || [];
    var browser = options.browser || false;
    var config = options.config || {};

    var presets = [];
    var plugins = [];

    // @babel/preset-env
    if(disabled.indexOf('env') === -1) {
        presets.push([
            env,
            Object.assign({
                targets: browser ? {browsers: 'last 2 versions'} : {node: 'current'}
            }, config.env)
        ])
    }

    // @babel/preset-react
    if(disabled.indexOf('react') === -1) {
        presets.push([
            react,
            config.react
        ]);
    }

    // @babel/preset-flow
    if(disabled.indexOf('flow') === -1) {
        presets.push([
            flow,
            config.flow
        ]);
    }

    // @babel/plugin-transform-runtime
    if(disabled.indexOf('transform-runtime') === -1) {
        plugins.push([
            transformRuntime,
            config['transform-runtime']
        ]);
    }

    // @babel/plugin-proposal-class-properties
    if(disabled.indexOf('transform-class-properties') === -1) {
        plugins.push([
            transformClassProperties,
            config['transform-class-properties']
        ]);
    }

    // @babel/plugin-syntax-dynamic-import
    if(disabled.indexOf('syntax-dynamic-import') === -1) {
        plugins.push([
            syntaxDynamicImport,
            config['syntax-dynamic-import']
        ]);
    }

    return {
        presets: presets,
        plugins: plugins
    };
}

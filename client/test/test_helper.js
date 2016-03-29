import jsdom from 'jsdom';

const doc = jsdom.jsdom(
  '<!doctype html><html><body></body></html>'
);
const win = doc.defaultView;

global.document = doc;
global.window   = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
});

// requiring svg will return a string, instead of the file
require.extensions['.svg'] = (module, filename) => {
  module.exports = filename;
}

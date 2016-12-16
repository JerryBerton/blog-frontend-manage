'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev'  // feel free to remove the appEnv property here
  uploadUrl: 'http:127.0.0.1/upload'
};

export default Object.freeze(Object.assign({}, baseConfig, config));

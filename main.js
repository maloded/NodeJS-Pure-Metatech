'use strict';

const fsp = require('node:fs').promises;
const path = rquire('node:path');

const appPath = path.join(process.cwd(), '../NodeJS-Application-Metatech');
const apiPath = path.join(appPath, './api');
const configPath = path.join(appPath, './config');
const staticPath = path.join(appPath, './static');

const staticServer= require('./lib/static.js');
const logger = require('./lib/logger.js');
const common = require('./lib/common.js');
const config = require('./lib/config.js')(configPath);
const load = require('./lib/load.js')(config.sandbox);
const db = require('./lib/db.js')(config.db);
const server = require('./lib/ws.js');

const sandbox = {
    api: Object.freeze({}),
    db: Object.freeze(db),
    console: Object.freeze(logger),
    common: Object.freeze(common),
};

const routing = {};

(async () => {
    const files = await fsp.readdir(apiPath);
    for (const fileName of files) {
        if (!fileName.endsWith('.js')) continue;
        const filePath = path.join(apiPath, fileName);
        const serviceName = path.basename(fileName, '.js');
        routing[serviceName] = await load(filePath, sandbox);   
    }

    const [port] = config.server.ports;
    staticServer(staticPath, port, logger);
    server(routing, port, logger);
})();
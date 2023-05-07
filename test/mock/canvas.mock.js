const resource_manager_mock = require('./resource_manager.mock');
const m_resource_manager = require('../../scripts/resource_manager');

async function mock() {
    resource_manager_mock.mock();
    document.body.innerHTML = await m_resource_manager.getResourceAsync('/index.html');
}

module.exports = { mock };
var reg = require('cla/reg');

reg.register('service.openstack.task', {
    name: 'Openstack Task',
    icon: '/plugin/cla-openstack-plugin/icon/openstack.svg',
    form: '/plugin/cla-openstack-plugin/form/openstack-form.js',
    handler: function(ctx, params) {
        var ci = require("cla/ci");
        var log = require('cla/log');
        var reg = require('cla/reg');
        var web = require("cla/web");
        var myutils = require("myutils");

        var openstackCI = ci.findOne({
            mid: params.openstackCI + ''
        });
        var identityUrl = openstackCI.identityUrl;
        var computeUrl = openstackCI.computeUrl || '';
        var username = openstackCI.username || '';
        var password = openstackCI.password || '';
        var projectId = openstackCI.projectId || '';
        var instanceId = params.instanceId || '';
        var instanceName = params.instanceName || '';
        var imageId = params.imageId || '';
        var flavorId = params.flavorId || '';
        var zone = params.zone || '';
        var volumeName = params.volumeName || '';
        var volumeDescription = params.volumeDescription || '';
        var size = params.size || 1;
        var volumeId = params.volumeId || '';
        var agent = web.agent({
            auto_parse: 0
        });
        var content = {};
        var token = myutils.getToken(agent, identityUrl, username, password, projectId);
        var headers = {
            'content-type': 'application/json',
            'X-Auth-Token': token
        };
        var url;
        if (params.args) {
            if (params.args == 'start_instance' || params.args == 'stop_instance') {
                var action;
                params.args == 'start_instance' ? action = 'os-start' : action = 'os-stop';
                content = {
                    [action]: null
                }
                content = JSON.stringify(content);
                url = computeUrl + 'servers/' + instanceId + '/action';
                var response = agent.post(url, {
                    headers: headers,
                    content: content
                });
            } else if (params.args == 'create_instance') {
                content = {
                    "server": {
                        "name": instanceName,
                        "imageRef": imageId,
                        "flavorRef": flavorId,
                    }
                }
                content = JSON.stringify(content);
                url = computeUrl + 'servers';
                var response = agent.post(url, {
                    headers: headers,
                    content: content
                });
            } else if (params.args == 'delete_instance') {
                url = computeUrl + 'servers/' + instanceId
                var response = agent.delete(url, {
                    headers: headers
                });
            } else if (params.args == 'create_volume') {
                url = computeUrl + 'os-volumes';
                content = {
                    "volume": {
                        "availability_zone": zone,
                        "display_name": volumeName,
                        "display_description": volumeDescription,
                        "size": size
                    }
                }
                content = JSON.stringify(content);
                var response = agent.post(url, {
                    headers: headers,
                    content: content
                });
            } else if (params.args == 'delete_volume') {
                url = computeUrl + 'os-volumes/' + volumeId;
                var response = agent.delete(url, {
                    headers: headers
                });
            }
        }
        log.info(params.args + _(" Openstack successful"));
    }
});
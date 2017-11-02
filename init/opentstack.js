var reg = require('cla/reg');

reg.register('service.openstack.task', {
    name: 'Openstack Task',
    icon: '/plugin/cla-openstack-plugin/icon/openstack.svg',
    form: '/plugin/cla-openstack-plugin/form/openstack-form.js',
    rulebook: {
        moniker: 'openstack_task',
        description: _('Executes the OpenStack commands'),
        required: ['openstack_rs', 'args'],
        allow: ['openstack_rs', 'args', 'instance_id', 'instance_name', 'image_id', 'flavor_id'
        , 'zone', 'volume_name', 'volume_desc', 'size', 'volume_id'],
        mapper: {
            'openstack_rs': 'openstackCI',
            'instance_id': 'instanceId',
            'instance_name': 'instanceName',
            'image_id': 'imageId',
            'flavor_id': 'flavorId',
            'volume_name': 'volumeName',
            'volume_desc': 'volumeDescription',
            'volume_id': 'volumeId'
        },
        examples: [{
            openstack_task: {
                openstack_rs: 'openstack_resource',
                args: 'start_instance',
                instance_id: "193f-4f44-a6c5-e79ef3bc8bb7"
            }
        },{
            openstack_task: {
                openstack_rs: 'openstack_resource',
                args: 'create_instance',
                instance_name: 'my new Instance',
                image_id: '7ab80adc-46c4-4ea0',
                flavor_id: '1'
            }
        },{
            openstack_task: {
                openstack_rs: 'openstack_resource',
                args: 'create_volume',
                volume_name: 'New Volume',
                volume_desc: 'my new volume with 10 GB',
                zone: 'nova',
                size: '10'
            }
        },{
            openstack_task: {
                openstack_rs: 'openstack_resource',
                args: 'delete_volume',
                volume_id: 'ad85c874-979b-431e'
            }
        }]
    },
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
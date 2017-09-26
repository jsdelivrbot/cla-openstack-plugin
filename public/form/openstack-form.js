(function(params) {

    var data = params.data || {};

    var openstackCI = Cla.ui.ciCombo({
        name: 'openstackCI',
        value: params.data.openstackCI || '',
        class: 'BaselinerX::CI::OpenstackServer',
        fieldLabel: _('Openstack Resource'),
        allowBlank: false,
        with_vars: 1
    });

    var args = Cla.ui.comboBox({
        name: 'args',
        fieldLabel: _('Options'),
        value: data.args || [],
        data: [
            ['create_instance', 'Create Instance'],
            ['start_instance', 'Start Instance'],
            ['stop_instance', 'Stop Instance'],
            ['delete_instance', 'Delete Instance'],
            ['create_volume', 'Create Volume'],
            ['delete_volume', 'Delete Volume'],
        ],
        singleMode: true,
        allowBlank: false
    });
    args.on('addItem', function() {
        var v = args.getValue();
        if (v == 'create_instance') {
            flavorId.allowBlank = false;
            instanceName.allowBlank = false;
            imageId.allowBlank = false;
            instanceName.show();
            imageId.show();
            flavorId.show();
            zone.hide();
            volumeName.hide();
            volumeDescription.hide();
            volumeSize.hide();
            instanceId.hide();
            volumeId.hide();
        } else if (v == 'create_volume') {
            zone.allowBlank = false;
            volumeName.allowBlank = false;
            volumeSize.allowBlank = false;
            zone.show();
            volumeName.show();
            volumeDescription.show();
            volumeSize.show();
            instanceName.hide();
            imageId.hide();
            flavorId.hide();
            instanceId.hide();
            volumeId.hide();
        } else if (v == 'delete_volume') {
            volumeId.allowBlank = false;
            zone.hide();
            volumeName.hide();
            volumeDescription.hide();
            volumeSize.hide();
            instanceName.hide();
            imageId.hide();
            flavorId.hide();
            instanceId.hide();
            volumeId.show();
        } else {
            instanceId.allowBlank = false;
            zone.hide();
            volumeName.hide();
            volumeDescription.hide();
            volumeSize.hide();
            instanceName.hide();
            imageId.hide();
            flavorId.hide();
            volumeId.hide();
            instanceId.show();
        }
    });
    var instanceId = Cla.ui.textField({
        name: 'instanceId',
        fieldLabel: _('ID Instance'),
        value: data.instanceId || '',
        hidden: (data.args == 'create_instance'),
    });
    var instanceName = Cla.ui.textField({
        name: 'instanceName',
        fieldLabel: _('Name Instance'),
        value: data.instanceName || '',
        hidden: !(data.args == 'create_instance')
    });

    var imageId = Cla.ui.textField({
        name: 'imageId',
        fieldLabel: _('ID Image'),
        value: data.imageId || '',
        hidden: !(data.args == 'create_instance')
    });

    var flavorId = Cla.ui.comboBox({
        name: 'flavorId',
        fieldLabel: _('ID Flavor'),
        value: data.flavorId || [],
        data: [
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
            ['5', '5'],
        ],
        singleMode: true,
        hidden: !(data.args == 'create_instance')
    });

    var zone = Cla.ui.textField({
        name: 'zone',
        fieldLabel: _('Availability zone'),
        value: data.zone || '',
        hidden: !(data.args == 'create_volume')
    });
    var volumeName = Cla.ui.textField({
        name: 'volumeName',
        fieldLabel: _('Name Volume'),
        value: data.volumeName || '',
        hidden: !(data.args == 'create_volume')
    });

    var volumeDescription = Cla.ui.textField({
        name: 'volumeDescription',
        fieldLabel: _('Volume Description'),
        value: data.volumeDescription || '',
        hidden: !(data.args == 'create_volume')
    });

    var volumeSize = Cla.ui.textField({
        name: 'size',
        fieldLabel: _('Size (GB)'),
        value: data.size || '',
        hidden: !(data.args == 'create_volume')
    });

    var volumeId = Cla.ui.textField({
        name: 'volumeId',
        fieldLabel: _('ID Volume'),
        value: data.volumeId || '',
        hidden: !(data.args == 'delete_volume')
    });
    var errors = Cla.ui.errorManagementBox({
        errorTypeName: 'type',
        errorTypeValue: params.data.type || 'warn',
        rcOkName: 'ok',
        rcOkValue: params.data.ok,
        rcWarnName: 'warn',
        rcWarnValue: params.data.warn,
        rcErrorName: 'error',
        rcErrorValue: params.data.error,
        errorTabsValue: params.data
    });

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            openstackCI,
            args,
            instanceId,
            instanceName,
            imageId,
            flavorId,
            volumeName,
            volumeDescription,
            zone,
            volumeSize,
            volumeId,
            errors
        ]
    });

    return panel;
})
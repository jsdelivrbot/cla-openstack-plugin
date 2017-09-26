(function(params) {

    var data = params.data || {};

    var identityUrl = Cla.ui.textField({
        name: 'identityUrl',
        fieldLabel: _('Identity Service URL'),
        value: data.identityUrl || '',
        allowBlank: false,
    });

    var computeUrl = Cla.ui.textField({
        name: 'computeUrl',
        fieldLabel: _('Compute Service URL'),
        value: data.computeUrl || '',
        allowBlank: false,
    }); 

    var username = Cla.ui.textField({
        name: 'username',
        fieldLabel: _('Username'),
        value: data.username || '',
        allowBlank: false
    });

    var password = Cla.ui.textField({
        name: 'password',
        fieldLabel: _('Password'),
        inputType: 'password',
        value: data.password || '',
        allowBlank: false
    });

    var projectId = Cla.ui.textField({
        name: 'projectId',
        fieldLabel: _('ID Project'),
        value: data.projectId || '',
        allowBlank: false,
    }); 

    return  [
        identityUrl,
        computeUrl,
        username,
        password,
        projectId
    ]
})
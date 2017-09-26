var ci = require("cla/ci");

ci.createRole("Openstack");

ci.createClass("OpenstackServer", {
    form: '/plugin/cla-openstack-plugin/form/openstack-ci-form.js',
    icon: '/plugin/cla-openstack-plugin/icon/openstack.svg',
    roles: ["Openstack"],
    has: {
        identityUrl: {
            is: "rw",
            isa: "Str",
            required: true
        },
        computeUrl: {
            is: "rw",
            isa: "Str",
            required: true
        },
        username: {
            is: "rw",
            isa: "Str",
            required: true
        },
        password: {
            is: "rw",
            isa: "Str",
            required: true
        },
        projectId: {
            is: "rw",
            isa: "Str",
            required: true
        }
    }
});
# OpenStack Plugin

OpenStack plugin will allow you to interact with instances and volumes of OpenStack.

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the `cla-openstack-plugin` folder inside the `CLARIVE_BASE/plugins`
directory in a Clarive instance.

## How to Use

Once the plugin is correctly installed, you will have a new resource called 'OpenStack Server' 
and a new palette service called 'Openstack Task'.

### OpenStack Server

This Resource is used to save your OpenStack settings:
The main fields are:

- **Identity Service URL** - URL to Identity Service.
- **Compute Service URL** - URL to Compute Service. 
- **Username** - OpenStack username.
- **Password** - OpenStack password.
- **ID Project** - ID of the project to use.

Configuration example:

    Identity Service URL: http://192.168.250.10:5000/v3
    Compute Service URL: http://192.168.250.10:8774/v2.1/
    Username: user
    Password: ***
    ID Project: e3ab5b9b9fef4b71bb545c6

### OpenStack Task

This palette service will let you to interact with OpenStack.
The main fields are:

- **Openstack Resource** - Resource where is the settings.
- **Options** - The options to interact with OpenStack are:

  - **Create Instance** - Create a new instance in OpenStack.
  - **Start Instance** - Start the instance indicated.
  - **Stop Instance** - Stop the instance indicated.
  - **Delete Instance** - Delete the instance indicated.
  - **Create Volume** - Create a new volume.
  - **Delete Volume** - Delete the volume indicated.

- **ID Instance** - ID of the instance to use.
- **Name Instance** - Name of the instance to create.
- **ID Image** - ID of the image to use.
- **ID Flavor** - ID of the flavor to use.
- **Name Volume** - Name of the volume.
- **Volume Description** - Description of the volume.
- **Availability zone** - The availability zone in which to launch the server.
- **Size (GB)** - Size of the volume in GB.
- **ID Volume** - ID of the volume to delete.

- **Errors and Output** - These two fields are related to manage control errors. Options are:
   - **Fail and Output Error** - Search for configurated error pattern in script output. If found, an error message is displayed in the monitor showing the match.
   - **Warn and Output Warn** - Search for the configured warning pattern in script output. If found, an error message is displayed in the monitor showing the match.
   - **Custom** - The the Errors combo is set to custom, a new form is displayed for defining behavior using these fields:
      - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the monitor.
      - **Warn** - Range of return code values to warn the user. A warn message will be displayed in the monitor.
      - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the monitor.
   - **Silent** - Silence all errors found.

The diferents configurations are:

Configuration Start, Stop or Delete Instance example:

    Openstack Resource: MyOpenStacksettings
    Options: Start Instance
    ID Instance: 193f-4f44-a6c5-e79ef3bc8bb7

Configuration Create Instance example:

    Openstack Resource: MyOpenStacksettings
    Options: Create Instance
    Name Instance: my new Instance
    ID Image: 7ab80adc-46c4-4ea0
    ID Flavor: 1

Configuration Create Volume example:

    Openstack Resource: MyOpenStacksettings
    Options: Create Volume
    Name Volume: New Volume
    Volume Description: my new volume with 10 GB
    Availability zone: nova
    Size (GB): 10

Configuration Delete Volume example:

    Openstack Resource: MyOpenStacksettings
    Options: Delete Volume
    ID Volume: ad85c874-979b-431e

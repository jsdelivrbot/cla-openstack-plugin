# OpenStack Plugin

<img src="https://cdn.jsdelivr.net/gh/clarive/cla-openstack-plugin/public/icon/openstack.svg?sanitize=true" alt="OpenStack Plugin" title="OpenStack Plugin" width="120" height="120">

OpenStack plugin will allow you to interact with instances and volumes of OpenStack.

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the `cla-openstack-plugin` folder inside the `$CLARIVE_BASE/plugins`
directory in a Clarive instance.

## OpenStack Server

To configurate the OpenStack Server Resource open:

In **Clarive SE**: Resources -> ClariveSE.

In **Clarive EE**: Resources -> OpenStack.

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

## Service configuration

### Parameters

These are the parameters to interact with OpenStack.

- **Openstack Resource (variable name: openstack_rs)** - Resource where is the settings.
- **Options (args)** - The options to interact with OpenStack are:
  - **Create Instance ("create_instance")** - Create a new instance in OpenStack.
  - **Start Instance ("start_instance")** - Start the instance indicated.
  - **Stop Instance ("stop_instance")** - Stop the instance indicated.
  - **Delete Instance ("delete_instance")** - Delete the instance indicated.
  - **Create Volume ("create_volume")** - Create a new volume.
  - **Delete Volume ("delete_volume")** - Delete the volume indicated.
- **ID Instance (instance_id)** - ID of the instance to use.
- **Name Instance (instance_name)** - Name of the instance to create.
- **ID Image (image_id)** - ID of the image to use.
- **ID Flavor (flavor_id)** - ID of the flavor to use.
- **Name Volume (volume_name)** - Name of the volume.
- **Volume Description (volume_desc)** - Description of the volume.
- **Availability zone (zone)** - The availability zone in which to launch the server.
- **Size (GB) (variable name: size)** - Size of the volume in GB.
- **ID Volume (volume_id)** - ID of the volume to delete.

**Only Clarive EE**

- **Errors and Output** - These two fields are related to manage control errors. Options are:
   - **Fail and Output Error** - Search for configurated error pattern in script output. If found, an error message is displayed in the monitor showing the match.
   - **Warn and Output Warn** - Search for the configured warning pattern in script output. If found, an error message is displayed in the monitor showing the match.
   - **Custom** - The the Errors combo is set to custom, a new form is displayed for defining behavior using these fields:
      - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the monitor.
      - **Warn** - Range of return code values to warn the user. A warn message will be displayed in the monitor.
      - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the monitor.
   - **Silent** - Silence all errors found.

## How to use

### In Clarive EE

You can find this service in the Rule Designer palette.

Op Name: **Openstack Task**

The diferents configurations are:

Configuration Start, Stop or Delete Instance example:

```yaml
    Openstack Resource: MyOpenStacksettings
    Options: Start Instance
    ID Instance: ${instance_id}
``` 

Configuration Create Instance example:

```yaml
    Openstack Resource: MyOpenStacksettings
    Options: Create Instance
    Name Instance: my new Instance
    ID Image: 7ab80adc-46c4-4ea0
    ID Flavor: 1
``` 

Configuration Create Volume example:

```yaml
    Openstack Resource: MyOpenStacksettings
    Options: Create Volume
    Name Volume: New Volume
    Volume Description: my new volume with 10 GB
    Availability zone: nova
    Size (GB): ${size}
``` 

Configuration Delete Volume example:

```yaml
    Openstack Resource: MyOpenStacksettings
    Options: Delete Volume
    ID Volume: ad85c874-979b-431e
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Configuration Start, Stop or Delete Instance example:

```yaml
rule: OpenStack demo
do:
   - openstack_task:
       openstack_rs: scan_server    # Required. Use the mid set to the resource you created
       args: 'start_instance'       # Required.
       instance_id: "193f-4f44-a6c5-e79ef3bc8bb7"
```

Configuration Create Instance example:

```yaml
rule: Yet another OpenStack demo
do:
   - openstack_task:
       openstack_rs: scan_server   # Required. Use the mid set to the resource you created
       args: 'create_instance'     # Required.
       instance_name: ${instance_name}
       image_id: '7ab80adc-46c4-4ea0'
       flavor_id: '1'
```

Configuration Create Volume example:

```yaml
rule: Yet another OpenStack demo
do:
   - openstack_task:
       openstack_rs: scan_server    # Required. Use the mid set to the resource you created
       args: 'create_volume'        # Required.
       volume_name: 'New Volume'
       volume_desc: 'my new volume with 10 GB'
       zone: 'nova'
       size: '10'
```

Configuration Delete Volume example:

```yaml
rule: Yet another OpenStack demo
do:
   - openstack_task:
       openstack_rs: scan_server    # Required. Use the mid set to the resource you created
       args: 'delete_volume'        # Required.
       volume_id: 'ad85c874-979b-431e'
```

##### Outputs

###### Success

The server will return the task output performed by the plugin.

###### Possible configuration failures

**Task failed**

You will get an error returned by the OpenStack API.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "openstack_task": "openstack_rs"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `maps` not available for op "openstack_task"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
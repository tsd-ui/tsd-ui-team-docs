
# Getting started

## Service Account

First, create a [service account](https://access.redhat.com/terms-based-registry/). This will be used to communicate with the API.

You'll need this for setting up the CLI tool, which will grant you access to the API.

## CLI Tool
In order to interact with the Calunga API you'll need to [set up the CLI tool](https://gitlab.cee.redhat.com/service/app-interface/-/blob/master/docs/tenant-services/pulp/cli-guide.md#base-cli-installation).

Once installed, update the base configuration file (`~/.config/pulp/cli.toml`) with the following values:
```toml
[cli]
base_url = "https://packages.redhat.com"
api_root = "/api/pulp/"
username = "<service-account-name>"
password = "<service-account-password>"
domain = "calunga-ui-dev"
headers = []
verify_ssl = false
format = "json"
dry_run = false
timeout = 0
verbose = 0
```

Once this is done run:
```bash
pulp status
```

You should see something like this:
```json
{
  "versions": [
    {
      "component": "core",
      "version": "3.102.0",
      "package": "pulpcore",
      "module": "pulpcore.app",
      "domain_compatible": true
    },
...
  "database_connection": {
    "connected": true
  },
  "redis_connection": {
    "connected": true
  },
  "storage": {
    "total": null,
    "used": 255644123405,
    "free": null
  },
  "content_settings": {
    "content_origin": "https://cert.console.redhat.com",
    "content_path_prefix": "/api/pulp-content/"
  },
  "domain_enabled": true
}
```

After you get a successful status, ask someone to add you to the group: https://internal.console.redhat.com/api/pulp-mgmt/

## Curl
Once you're in the domain group and have access to the APIs you should be able to make direct API calls using `curl`.

First set up these ENV variables:
```bash
export PULP_USERAME=<service-account>
export PULP_PASSWORD=<service-account-pass>
```

Now you're all set:
```bash
curl -L -u "$PULP_USERNAME:$PULP_PASSWORD" -H "Accept: application/json" -H "Content-Type: application/json" "https://packages.redhat.com/api/pulp/<domain>/api/v3/content/python/packages" | jq
```


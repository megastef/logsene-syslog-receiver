# SYSLOG as a Microservice with Cloud Logging Backend

Start dynamically a syslog server on demand. Associate LOGSENE Application Token with a port number

# Installation

```
npm i logsene-syslog-receiver -g
```

# Start it
logsene-syslog-receiver 9095

# Provisioning

```
curl localhost:9095?token=YOUR_LOGSNE_TOKEN
```
The command returns token and port number as JSON
```
{ token: 'f9cf9b63-XXXX-XXXX-XXXX-3d52f1f13198', port: '1714' }
```

Now you can ship logs to syslog receiver on localhost:1714 (UDP) and it will be displayed in the Logsene App identified by token 'f9cf9b63-XXXX-XXXX-XXXX-3d52f1f13198'





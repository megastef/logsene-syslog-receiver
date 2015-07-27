'use strict'
var Logsene = require('logsene-js')
var query = require('url')
var http = require('http')
var port = 1714

function LogseneSyslogServer () {
  this.servers = {}
}

LogseneSyslogServer.prototype = {
  getSyslogServer: function (appToken, port, type) {
    var logger = new Logsene(appToken, type || 'logs')
    var Syslogd = require('syslogd')
    var syslogd = Syslogd(function (info) {
      logger.log(info.severity || 'info', info.msg, info, function (err) {
        if (err) {
          console.log(err)
        }
      })
      console.log(JSON.stringify(info))
    })
    syslogd.listen(port, function (err) {
      console.log('start syslog server ' + port + ' ' + (err || ''))
    })
    this.servers[appToken] = syslogd
  },
  api: function (req, res) {
    var q = query.parse(req.url, true).query
    console.log(q)
    try {
      this.getSyslogServer(q.token, ++port)
      res.end(JSON.stringify({success: 'syslod started' + q.token, port: port, app: q.token}))
    } catch (ex) {
      console.log(ex.stack)
      res.end(JSON.stringify({error: ex}))
    }
  }
}
var syslog = new LogseneSyslogServer()
http.createServer(function (req, res) { syslog.api(req, res) })
  .listen(process.argv[2] || 9095)

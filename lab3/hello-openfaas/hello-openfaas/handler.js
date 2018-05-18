"use strict"

module.exports = (context, callback) => {
  sys.stderr.write("This should be an error message.\n")
  return json.dumps({ "Hello": "OpenFaaS" })
    // callback(undefined, {status: "done"});
}

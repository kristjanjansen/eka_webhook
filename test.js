const axios = require("axios");

// axios
// .post(
//   "https://maker.ifttt.com/trigger/message/with/key/lxIdjiGjobwc6iSBjc5kD-WgvtzGIgKdAZbqNP-uqVz",
//   { value1: 'aaaa' }
// ).then(e => console.log(e.data)).catch(e => console.log(e))

axios
.post(
  "https://hooks.slack.com/services/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",
  { text: 'testing a hook' }
).then(e => console.log(e.data)).catch(e => console.log(e))
const { json, text } = require("micro");
const { router, post } = require("microrouter");
const cors = require("micro-cors")();
const io = require("socket.io-client");
const axios = require("axios");
const qs = require("query-string");

const socket = io.connect("https://eka-server.now.sh");

socket.on("message", m => {
  if (m.message.startsWith("@ifttt")) {
    let payload = {};
    if (m.value1) payload.value1 = m.value1;
    if (m.value2) payload.value1 = m.value2;
    if (m.value3) payload.value1 = m.value3;
    axios
      .get(
        "https://maker.ifttt.com/trigger/message/with/key/lxIdjiGjobwc6iSBjc5kD-WgvtzGIgKdAZbqNP-uqVz",
        payload
      )
      .catch(e => console.log(e));
  }
  if (m.message.startsWith("@slack")) {
    axios
      .post(
        "https://hooks.slack.com/services/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",
        { text: m.message.replace("@slack", "").trim() }
      )
      .catch(e => console.log(e));
  }
});

const ifttt = async req => {
  const payload = await json(req);
  socket.emit('message', { ...payload, type: "ifttt" });
};

const slack = async req => {
  const payload = await text(req);
  const parsedPayload = qs.parse(payload);
  socket.emit('message', { message: parsedPayload.text, type: "slack", ...parsedPayload });
};

module.exports = cors(router(post("/ifttt", ifttt), post("/slack", slack)));

console.log("Listening on /ifttt and /slack");

console.log("Hello");

import modesl from "modesl";

const connection = modesl.Connection;

/* const freeswitchListener = new modesl.Server(() => {
    // console.log('Server listening on localhost at port 8022');
}); */

const freeswitchConnection = new connection(
  "FREESWITCH_IP",
  "8021",
  "ESL_PASSWORD",
  () => {
    // console.log('connection initialized');

    freeswitchConnection.api("conference", ["confname", "dial", "user/1006"]);

    freeswitchConnection.bgapi(
      "conference",
      ["confname", "dial", "user/1006"],
      "job-id",
      () => {
        console.log("action queued");
      }
    );

    freeswitchConnection.events("json", "all");

    freeswitchConnection.subscribe("all");

    freeswitchConnection.on("esl::event::*::*", (event: modesl.Event) => {
      const headerValue = event.getHeader("header");

      const body = event.getBody();

      const headers = event.headers;

      headers.forEach((header: modesl.Header) => {
        const headerName = header.name;
        const headerValue = header.value;
      });
    });
  }
);

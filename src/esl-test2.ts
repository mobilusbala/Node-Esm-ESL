import { head } from "lodash";
import modesl, { Connection } from "modesl";

console.log("acjsjnmsd");

var count = 0;

const conn = new modesl.Connection(
  "FREESWITCH_IP",
  "8021",
  "ESL_PASSWORD",
  function () {
    conn.events(
      "json",
      "CHANNEL_CREATE CHANNEL_DESTROY CUSTOM conference::maintenance sofia::register sofia::expire"
    );

    conn.subscribe(
      "CHANNEL_CREATE CHANNEL_DESTROY CUSTOM conference::maintenance sofia::register sofia::expire"
    );

    console.log("connected ->", conn.connected());

    conn.on("esl::event::*::*", (event: modesl.Event) => {
      const headerValue = event.getHeader("header");

      const body = event.getBody();

      const headers = event.headers;

      const obj = {};

      headers.forEach((header: modesl.Header) => {
        const headerName = header.name;
        const headerValue = header.value;

        obj[header.name] = header.value;
      });

      if (
        [
          "CHANNEL_CALLSTATE",
          "CHANNEL_CREATE",
          "CHANNEL_DESTROY",
          "CHANNEL_STATE",
          "CHANNEL_ANSWER",
          "CHANNEL_HANGUP",
          "CHANNEL_HANGUP_COMPLETE",
          "CHANNEL_EXECUTE",
          // 'CHANNEL_EXECUTE_COMPLETE',
          "CHANNEL_BRIDGE",
          "CHANNEL_UNBRIDGE",
          "CHANNEL_PROGRESS",
          "CHANNEL_PROGRESS_MEDIA",
          "CHANNEL_OUTGOING",
          "CHANNEL_PARK",
          "CHANNEL_UNPARK",
          "CHANNEL_APPLICATION",
          "CHANNEL_HOLD",
          "CHANNEL_UNHOLD",
          "CHANNEL_ORIGINATE",
          "CHANNEL_UUID",
          "DETECTED_SPEECH",
        ].indexOf(event.getType()) >= 0
      ) {
        //  'API', 'HEARTBEAT', 'RE_SCHEDULE'

        console.log(
          count,
          ".event ->",
          obj["Event-Name"],
          "callId",
          obj["Core-UUID"],
          "userId",
          obj["variable_sip_from_user"],
          "conversationId",
          obj["Caller-Destination-Number"],
          "recorded file name",
          obj["variable_sofia_record_file"]
        );
        count++;
      }

      //console.log(count, '.event ->', obj);
      //count++;
    });
  }
);

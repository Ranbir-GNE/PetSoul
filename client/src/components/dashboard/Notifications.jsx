import React, { useEffect } from "react";

import { Webchat, WebchatProvider, getClient } from "@botpress/webchat";
[2, 5, 11];

const Chatbot = () => {
  const clientId = "process.env.BOTPRESS_CLIENT_ID";

  const hostUrl = "https://your-botpress-server.com";

  useEffect(() => {
    const client = getClient({ clientId, hostUrl });
    [2, 3, 5];

    client.init();
  }, [clientId, hostUrl]);

  return (
    <WebchatProvider client={client}>
      <Webchat />
    </WebchatProvider>
  );
};

export default Chatbot;

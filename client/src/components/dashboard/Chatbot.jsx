import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        botId: import.meta.env.VITE_BOTPRESS_BOT_ID, // Ensure correct env variable
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        cookieOptions: {
          sameSite: "None",
          secure: false, 
        },
        clientId: "e03c327e-0950-4edb-84ea-2dd2eec252cc", 
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;

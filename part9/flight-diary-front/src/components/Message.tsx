import type { MessageType } from "../types";

const Message = ({ text, success }: MessageType) => {
  if (!text) return null;

  const color = success ? "green" : "red";

  return <div style={{ color: color, marginBottom: "10px" }}>{text}</div>;
};

export default Message;

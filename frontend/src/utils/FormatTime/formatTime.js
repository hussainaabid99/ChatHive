import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatMessageTime = (isoTime) => {
  const now = dayjs();
  const msgTime = dayjs(isoTime);

  if (now.isSame(msgTime, "day")) {
    return msgTime.format("h:mm A");
  } else {
    return msgTime.format("h:mm A, D MMM");
  }
};

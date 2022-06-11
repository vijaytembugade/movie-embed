import { notification } from "antd";
const openNotification = (args) => {
  notification.info({
    message: args.message,
    description: "",
    placement: "bottomRight",
  });
};

export { openNotification };

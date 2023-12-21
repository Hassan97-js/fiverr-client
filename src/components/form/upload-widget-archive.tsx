import { useEffect } from "react";

let cloudinary;
let widget;

const UploadWidget = ({ children, onUpload }) => {
  /**
   * @description Creates a new instance of the Cloudinary widget and store it in a variable
   */

  const createWidget = () => {
    const options = {
      cloudName: "fiverr-assets-cloud",
      uploadPreset: "fiverr-assets-preset"
    };

    const onCreateUploadWidget = (error, result) => {
      // The callback is a bit more chatty than failed or success so
      // only trigger when one of those are the case. You can additionally
      // create a separate handler such as onEvent and trigger it on
      // ever occurance
      if (error || result.event === "success") {
        onUpload({ error, result, widget });
      }

      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
      }
    };

    return cloudinary?.createUploadWidget(options, onCreateUploadWidget);
  };

  /**
   * createWidget on first render
   * @description Creates a new instance of the Cloudinary widget
   * on first render, if Cloudinary instance is not created yet
   */
  useEffect(() => {
    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }

    const onIdle = () => {
      if (!widget) {
        widget = createWidget();
      }
    };

    // requestIdleCallback: improve load time of the widget on first instance
    // to trigger widget creation. If requestIdleCallback isn't supported, fall back to setTimeout
    if ("requestIdleCallback" in window) {
      requestIdleCallback(onIdle);
    } else {
      setTimeout(onIdle, 1);
    }
  }, []);

  /**
   * open
   * @description When triggered, uses the current widget instance to open the upload modal
   */

  const openWidget = () => {
    if (!widget) {
      widget = createWidget();
    }

    widget && widget.open();
  };

  return <>{children({ cloudinary, widget, openWidget })}</>;
};

export default UploadWidget;

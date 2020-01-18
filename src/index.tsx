import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ReactMagnifier from "./ReactMagnifier/ReactMagnifier";
import * as serviceWorker from "./serviceWorker";

function showEvent(data: any): void {
   data.addEventListener("magnifier-initialized", (e: any): void => {
      console.log(e);
   });
}

ReactDOM.render(
   <ReactMagnifier
      zoomSize={3}
      imageHeight={400}
      imageWidth={600}
      // magnifierHeight={200}
      // magnifierWidth={200}
      magnifierRadius={50}
      magnifierBorderColor={"white"}
      magnifierBorderStyle={"solid"}
      magnifierBorderWidth={2}
      cursor={"none"}
      imageUrl="https://images.unsplash.com/photo-1578663248901-198b64da244e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
      getMagnifier={showEvent}
      customImgStyles={'myClass'}
      customContainerStyles={'aClass'}

   />,
   document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

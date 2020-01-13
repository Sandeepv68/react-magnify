/* eslint-disable import/first */
import * as React from "react";
import { ReactMagnifierProps, ReactMagnifierDefaultState } from "./ReactMagnifier.Interface";

import "./style.css";

export default class ReactMagnifier extends React.Component<
   ReactMagnifierProps,
   ReactMagnifierDefaultState
> {
   private magnifiableImage: React.RefObject<HTMLImageElement>;
   private imageContainer: React.RefObject<HTMLDivElement>;
   private reactMagnifierGlassClass: string;
   private imageUrlMissingError: string;

   public static defaultProps = {
      imageUrl: "",
      imageAltText: "react-magnifier-image",
      imageWidth: 200,
      imageHeight: 200,
      magnifierHeight: 100,
      magnifierWidth: 100,
      magnifierRadius: 50,
      magnifierBorderColor: "#000",
      magnifierBorderStyle: "solid",
      magnifierBorderWidth: 3,
      cursor: "none",
      zoomSize: 2
   };

   constructor(props: ReactMagnifierProps) {
      super(props);
      this.magnifiableImage = React.createRef();
      this.imageContainer = React.createRef();
      this.reactMagnifierGlassClass = "react-magnifier-glass";
      this.imageUrlMissingError = "Image url is missing!";
   }

   componentDidMount() {
      if (this.isValidProp(this.props.imageUrl)) {
         return this.magnify();
      } else {
         return this.logError();
      }
   }

   componentDidUpdate() {
      return this.magnify();
   }

   private isValidProp(prop: string): boolean {
      if (prop && prop !== null && prop !== undefined && prop !== "") {
         return true;
      } else {
         return false;
      }
   }

   private magnify(): void {
      let w: number;
      let h: number;
      let bw: number;

      /* Create magnifier glass: */
      let glass = document.createElement("DIV") as HTMLDivElement;
      glass.setAttribute("class", this.reactMagnifierGlassClass);

      /* Insert magnifier glass: */
      this.magnifiableImage.current.parentElement.insertBefore(
         glass,
         this.magnifiableImage.current
      );

      /* Set background properties for the magnifier glass: */
      glass.style.visibility = "hidden";
      glass.style.width = `${this.props.magnifierWidth}px`;
      glass.style.height = `${this.props.magnifierHeight}px`;
      glass.style.borderRadius = `${this.props.magnifierRadius}%`;
      glass.style.border = `${this.props.magnifierBorderWidth}px ${this.props.magnifierBorderStyle} ${this.props.magnifierBorderColor}`;
      glass.style.cursor = `${this.props.cursor}`;

      glass.style.backgroundImage = "url('" + this.magnifiableImage.current.src + "')";
      glass.style.backgroundRepeat = "no-repeat";
      glass.style.backgroundSize =
         this.magnifiableImage.current.width * this.props.zoomSize +
         "px " +
         this.magnifiableImage.current.height * this.props.zoomSize +
         "px";
      bw = 3;
      w = glass.offsetWidth / 2;
      h = glass.offsetHeight / 2;

      const moveMagnifier = (e: any) => {
         let x: number;
         let y: number;
         let pos;
         /* Prevent any other actions that may occur when moving over the image */
         e.preventDefault();
         /* Get the cursor's x and y positions: */
         pos = getCursorPos(e);
         x = pos.x;
         y = pos.y;
         /* Prevent the magnifier glass from being positioned outside the image: */
         if (x > this.magnifiableImage.current.width - w / this.props.zoomSize) {
            x = this.magnifiableImage.current.width - w / this.props.zoomSize;
         }
         if (x < w / this.props.zoomSize) {
            x = w / this.props.zoomSize;
         }
         if (y > this.magnifiableImage.current.height - h / this.props.zoomSize) {
            y = this.magnifiableImage.current.height - h / this.props.zoomSize;
         }
         if (y < h / this.props.zoomSize) {
            y = h / this.props.zoomSize;
         }
         /* Set the position of the magnifier glass: */
         glass.style.left = x - w + "px";
         glass.style.top = y - h + "px";
         /* Display what the magnifier glass "sees": */
         glass.style.backgroundPosition =
            "-" +
            (x * this.props.zoomSize - w + bw) +
            "px -" +
            (y * this.props.zoomSize - h + bw) +
            "px";
      };

      const getCursorPos = (e: any) => {
         let a;
         let x: number;
         let y: number;
         e = e || window.event;
         /* Get the x and y positions of the image: */
         a = this.magnifiableImage.current.getBoundingClientRect();
         /* Calculate the cursor's x and y coordinates, relative to the image: */
         x = e.pageX - a.left;
         y = e.pageY - a.top;
         /* Consider any page scrolling: */
         x = x - window.pageXOffset;
         y = y - window.pageYOffset;
         return { x: x, y: y };
      };

      const showMagnifier = (e: any) => {
         glass.style.visibility = "visible";
      };

      const hideMagnifier = (e: any) => {
         glass.style.visibility = "hidden";
      };

      this.imageContainer.current.addEventListener("mouseenter", showMagnifier);
      this.imageContainer.current.addEventListener("mouseleave", hideMagnifier);

      /* Execute a function when someone moves the magnifier glass over the image: */
      glass.addEventListener("mousemove", moveMagnifier);
      this.magnifiableImage.current.addEventListener("mousemove", moveMagnifier);

      /*and also for touch screens:*/
      glass.addEventListener("touchmove", moveMagnifier);
      this.magnifiableImage.current.addEventListener("touchmove", moveMagnifier);
   }

   private logError(): void {
      console.log(
         `%c ReactMagnifier Error: ${this.imageUrlMissingError}. \n<ReactMagnifier imageUrl={url}/> is required.`,
         "background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;"
      );
   }

   render() {
      return (
         <div className="react-magnifier-image-container" ref={this.imageContainer}>
            <img
               ref={this.magnifiableImage}
               src={this.props.imageUrl}
               width={this.props.imageWidth}
               height={this.props.imageHeight}
               alt={this.props.imageAltText}
            />
         </div>
      );
   }
}

/**
 * ReactMagnifier v0.0.4
 * A simple configurable react plugin to perform image magnification
 * written by: Sandeep Vattapparambil
 * email: sandeepv68@gmail.com
 */
/* eslint-disable import/first */

/**
 * Import react library
 */
import * as React from "react";

/**
 * Import ReactMagnifierProps and ReactMagnifierDefaultState interfaces
 */
import { ReactMagnifierProps, ReactMagnifierDefaultState } from "./ReactMagnifier.Interface";

/**
 * Import component stylesheets
 */
import "./style.css";

/**
 * @class ReactMagnifier
 * @extends React.Component
 * @typeparam ReactMagnifierProps {Interface} - The input props interface
 * @typeparam ReactMagnifierDefaultState {Interface} - The default state interface
 */
export default class ReactMagnifier extends React.Component<
   ReactMagnifierProps,
   ReactMagnifierDefaultState
> {
   /**
    * @constant magnifiableImage - React element reference for image to be magnified
    * @constant imageContainer - React element reference for the conatiner of image to be magnified
    * @constant reactMagnifierGlassClass - CSS class for the magnifier
    * @constant imageUrlMissingError - Input image prop validation error message
    * @constant reactMagnifierGlass - The magnifier glass element
    * @constant pixelPadding - A padding value for adjusting background image position for magnifier glass
    */
   private magnifiableImage: React.RefObject<HTMLImageElement>;
   private imageContainer: React.RefObject<HTMLDivElement>;
   private reactMagnifierGlassClass: string;
   private imageUrlMissingError: string;
   private glass: HTMLDivElement;
   private pixelPadding: number;
   private width: number;
   private height: number;

   /**
    * Set default props
    */
   public static defaultProps = {
      imageUrl: "",
      imageAltText: "react-magnifier-image",
      imageWidth: "auto",
      imageHeight: "auto",
      magnifierHeight: 100,
      magnifierWidth: 100,
      magnifierRadius: 50,
      magnifierBorderColor: "#000",
      magnifierBorderStyle: "solid",
      magnifierBorderWidth: 3,
      magnifierShadow: true,
      cursor: "none",
      zoomSize: 2,
      getMagnifier: () => {},
      customImgStyles: "",
      customContainerStyles: ""
   };

   constructor(props: ReactMagnifierProps) {
      super(props);
      this.magnifiableImage = React.createRef();
      this.imageContainer = React.createRef();
      this.reactMagnifierGlassClass = "react-magnifier-glass";
      this.imageUrlMissingError = "Image url is missing!";
      this.glass = null;
      this.pixelPadding = 3;
      this.width = 0;
      this.height = 0;
   }

   /**
    * Once component is mounted, validate props and render the magnifier
    * or throw error if props are invalid
    */
   componentDidMount() {
      this.props.getMagnifier(this.imageContainer.current);
      if (this.isValidProp(this.props.imageUrl)) {
         return this.magnify();
      } else {
         return this.logError();
      }
   }

   /**
    * re-render magnifier upon component updation
    */
   componentDidUpdate() {
      this.props.getMagnifier(this.imageContainer.current);
      return this.magnify();
   }

   /**
    * Clear the component and remove all event listeners attached
    */
   componentWillUnmount() {
      this.glass.removeEventListener("mousemove", this.moveMagnifier);
      this.glass.removeEventListener("touchmove", this.moveMagnifier);
      this.imageContainer.current.removeEventListener("mouseenter", this.showMagnifier);
      this.imageContainer.current.removeEventListener("mouseleave", this.hideMagnifier);
      this.magnifiableImage.current.removeEventListener("mousemove", this.moveMagnifier);
      this.magnifiableImage.current.removeEventListener("touchmove", this.moveMagnifier);
   }

   /**
    * @function isValidProp
    * A helper function to validate input props
    * @param prop {String} - The prop to be validated
    * @returns Returns true or false
    */
   private isValidProp(prop: string): boolean {
      if (prop && prop !== null && prop !== undefined && prop !== "") {
         return true;
      } else {
         return false;
      }
   }

   /**
    * @function magnify
    * A helper to render magnified image and magnifier with input props
    */
   private magnify(): void {
      /**
       * Create magnifier glass:
       */
      this.glass = document.createElement("DIV") as HTMLDivElement;
      this.glass.setAttribute("class", this.reactMagnifierGlassClass);

      /**
       * Insert magnifier glass:
       */
      this.magnifiableImage.current.parentElement.insertBefore(
         this.glass,
         this.magnifiableImage.current
      );

      /**
       * Set background properties for the magnifier glass:
       */
      this.glass.classList.add("hide-magnifier");
      this.glass.style.width = `${this.props.magnifierWidth}px`;
      this.glass.style.height = `${this.props.magnifierHeight}px`;
      this.glass.style.borderRadius = `${this.props.magnifierRadius}%`;
      this.glass.style.border = `${this.props.magnifierBorderWidth}px ${this.props.magnifierBorderStyle} ${this.props.magnifierBorderColor}`;
      this.glass.style.cursor = `${this.props.cursor}`;
      this.glass.style.boxShadow = this.props.magnifierShadow
         ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);"
         : "none";

      this.glass.style.backgroundImage = "url('" + this.magnifiableImage.current.src + "')";
      this.glass.style.backgroundRepeat = "no-repeat";
      this.glass.style.backgroundSize =
         this.magnifiableImage.current.width * this.props.zoomSize +
         "px " +
         this.magnifiableImage.current.height * this.props.zoomSize +
         "px";
      this.width = this.glass.offsetWidth / 2;
      this.height = this.glass.offsetHeight / 2;

      this.imageContainer.current.addEventListener("mouseenter", this.showMagnifier);
      this.imageContainer.current.addEventListener("mouseleave", this.hideMagnifier);

      /**
       * Execute a function when someone moves the magnifier glass over the image:
       */
      this.glass.addEventListener("mousemove", this.moveMagnifier);
      this.magnifiableImage.current.addEventListener("mousemove", this.moveMagnifier);

      /**
       * and also for touch screens:
       */
      this.glass.addEventListener("touchmove", this.moveMagnifier);
      this.magnifiableImage.current.addEventListener("touchmove", this.moveMagnifier);

      /**
       * trigger "magnfier-initialized" custom event
       */
      this.triggerEvent("magnifier-initialized", this.imageContainer.current);
   }

   /**
    * @function moveMagnifier
    * A helper function to move and position the magnifier when cursor is moved
    * @param e - The event object
    */
   private moveMagnifier = (e: any) => {
      let x: number;
      let y: number;
      let pos;

      /**
       * Prevent any other actions that may occur when moving over the image
       */
      e.preventDefault();

      /**
       * Get the cursor's x and y positions:
       */
      pos = this.getCursorPos(e);
      x = pos.x;
      y = pos.y;

      /**
       * Prevent the magnifier glass from being positioned outside the image:
       */
      if (x > this.magnifiableImage.current.width - this.width / this.props.zoomSize) {
         x = this.magnifiableImage.current.width - this.width / this.props.zoomSize;
      }
      if (x < this.width / this.props.zoomSize) {
         x = this.width / this.props.zoomSize;
      }
      if (y > this.magnifiableImage.current.height - this.height / this.props.zoomSize) {
         y = this.magnifiableImage.current.height - this.height / this.props.zoomSize;
      }
      if (y < this.height / this.props.zoomSize) {
         y = this.height / this.props.zoomSize;
      }

      /**
       * Set the position of the magnifier glass:
       */
      this.glass.style.left = x - this.width + "px";
      this.glass.style.top = y - this.height + "px";

      /**
       * Display what the magnifier glass "sees":
       */
      this.glass.style.backgroundPosition =
         "-" +
         (x * this.props.zoomSize - this.width + this.pixelPadding) +
         "px -" +
         (y * this.props.zoomSize - this.height + this.pixelPadding) +
         "px";

      /**
       * trigger "magnfier-moved" custom event
       */
      this.triggerEvent("magnfier-moved", this.imageContainer.current);
   };

   /**
    * @function getCursorPos
    * A helper function to get current position of cursor
    * @param e - The event object
    */
   private getCursorPos = (e: any) => {
      let a;
      let x: number;
      let y: number;
      e = e || window.event;

      /**
       * Get the x and y positions of the image:
       */
      a = this.magnifiableImage.current.getBoundingClientRect();

      /**
       * Calculate the cursor's x and y coordinates, relative to the image:
       */
      x = e.pageX - a.left;
      y = e.pageY - a.top;

      /**
       * Consider any page scrolling:
       */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
   };

   /**
    * @function showMagnifier
    * A helper function to show magnifier and also to trigger a "magnfier-visible" customevent
    */
   private showMagnifier = () => {
      this.glass.classList.remove("hide-magnifier");
      this.glass.classList.add("show-magnifier");
      this.triggerEvent("magnfier-visible", this.imageContainer.current);
   };

   /**
    * @function hideMagnifier
    * A helper function to hide magnifier and also to trigger a "magnfier-invisible" customevent
    */
   private hideMagnifier = () => {
      this.glass.classList.remove("show-magnifier");
      this.glass.classList.add("hide-magnifier");
      this.triggerEvent("magnfier-invisible", this.imageContainer.current);
   };

   /**
    * @function logError
    * A helper function to log custom error messages
    */
   private logError(): void {
      console.log(
         `%c ReactMagnifier Error: ${this.imageUrlMissingError}. \n<ReactMagnifier imageUrl={url}/> is required.`,
         "background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;"
      );
   }

   /**
    * @function triggerEvent
    * A helper to dispatch custom events
    * @param eventType {String} - The name/type of event
    * @param element {any} - The DOM element/React component which dispatched the event
    */
   private triggerEvent(eventType: string, element: HTMLElement): void {
      let event = new CustomEvent(eventType, { detail: element });
      element.dispatchEvent(event);
   }

   render() {
      return (
         <div
            className={`react-magnifier-image-container ${this.props.customContainerStyles}`}
            ref={this.imageContainer}
         >
            <img
               ref={this.magnifiableImage}
               className={this.props.customImgStyles}
               src={this.props.imageUrl}
               width={this.props.imageWidth}
               height={this.props.imageHeight}
               alt={this.props.imageAltText}
            />
         </div>
      );
   }
}

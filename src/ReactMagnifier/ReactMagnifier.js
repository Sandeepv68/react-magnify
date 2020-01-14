/**
 * ReactMagnifier v0.0.1
 * A simple configurable react plugin to perform image magnification
 * written by: Sandeep Vattapparambil
 * email: sandeepv68@gmail.com
 */
/* eslint-disable import/first */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Import react library
 */
import * as React from "react";
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
var ReactMagnifier = /** @class */ (function (_super) {
    __extends(ReactMagnifier, _super);
    function ReactMagnifier(props) {
        var _this = _super.call(this, props) || this;
        _this.magnifiableImage = React.createRef();
        _this.imageContainer = React.createRef();
        _this.reactMagnifierGlassClass = "react-magnifier-glass";
        _this.imageUrlMissingError = "Image url is missing!";
        return _this;
    }
    /**
     * Once component is mounted, validate props and render the magnifier
     * or throw error if props are invalid
     */
    ReactMagnifier.prototype.componentDidMount = function () {
        this.props.getMagnifier(this.imageContainer.current);
        if (this.isValidProp(this.props.imageUrl)) {
            return this.magnify();
        }
        else {
            return this.logError();
        }
    };
    /**
     * re-render magnifier upon component updation
     */
    ReactMagnifier.prototype.componentDidUpdate = function () {
        this.props.getMagnifier(this.imageContainer.current);
        return this.magnify();
    };
    /**
     * @function isValidProp
     * A helper function to validate input props
     * @param prop {String} - The prop to be validated
     * @returns Returns true or false
     */
    ReactMagnifier.prototype.isValidProp = function (prop) {
        if (prop && prop !== null && prop !== undefined && prop !== "") {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @function magnify
     * A helper to render magnified image and magnifier with input props
     */
    ReactMagnifier.prototype.magnify = function () {
        var _this = this;
        var w;
        var h;
        var bw;
        /**
         * Create magnifier glass:
         */
        var glass = document.createElement("DIV");
        glass.setAttribute("class", this.reactMagnifierGlassClass);
        /**
         * Insert magnifier glass:
         */
        this.magnifiableImage.current.parentElement.insertBefore(glass, this.magnifiableImage.current);
        /**
         * Set background properties for the magnifier glass:
         */
        glass.classList.add("hide-magnifier");
        glass.style.width = this.props.magnifierWidth + "px";
        glass.style.height = this.props.magnifierHeight + "px";
        glass.style.borderRadius = this.props.magnifierRadius + "%";
        glass.style.border = this.props.magnifierBorderWidth + "px " + this.props.magnifierBorderStyle + " " + this.props.magnifierBorderColor;
        glass.style.cursor = "" + this.props.cursor;
        glass.style.boxShadow = this.props.magnifierShadow
            ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);"
            : "none";
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
        /**
         * @function moveMagnifier
         * A helper function to move and position the magnifier when cursor is moved
         * @param e - The event object
         */
        var moveMagnifier = function (e) {
            var x;
            var y;
            var pos;
            /**
             * Prevent any other actions that may occur when moving over the image
             */
            e.preventDefault();
            /**
             * Get the cursor's x and y positions:
             */
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;
            /**
             * Prevent the magnifier glass from being positioned outside the image:
             */
            if (x > _this.magnifiableImage.current.width - w / _this.props.zoomSize) {
                x = _this.magnifiableImage.current.width - w / _this.props.zoomSize;
            }
            if (x < w / _this.props.zoomSize) {
                x = w / _this.props.zoomSize;
            }
            if (y > _this.magnifiableImage.current.height - h / _this.props.zoomSize) {
                y = _this.magnifiableImage.current.height - h / _this.props.zoomSize;
            }
            if (y < h / _this.props.zoomSize) {
                y = h / _this.props.zoomSize;
            }
            /**
             * Set the position of the magnifier glass:
             */
            glass.style.left = x - w + "px";
            glass.style.top = y - h + "px";
            /**
             * Display what the magnifier glass "sees":
             */
            glass.style.backgroundPosition =
                "-" +
                    (x * _this.props.zoomSize - w + bw) +
                    "px -" +
                    (y * _this.props.zoomSize - h + bw) +
                    "px";
            /**
             * trigger "magnfier-moved" custom event
             */
            _this.triggerEvent("magnfier-moved", _this.imageContainer.current);
        };
        /**
         * @function getCursorPos
         * A helper function to get current position of cursor
         * @param e - The event object
         */
        var getCursorPos = function (e) {
            var a;
            var x;
            var y;
            e = e || window.event;
            /**
             * Get the x and y positions of the image:
             */
            a = _this.magnifiableImage.current.getBoundingClientRect();
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
        var showMagnifier = function () {
            glass.classList.remove("hide-magnifier");
            glass.classList.add("show-magnifier");
            _this.triggerEvent("magnfier-visible", _this.imageContainer.current);
        };
        /**
         * @function hideMagnifier
         * A helper function to hide magnifier and also to trigger a "magnfier-invisible" customevent
         */
        var hideMagnifier = function () {
            glass.classList.remove("show-magnifier");
            glass.classList.add("hide-magnifier");
            _this.triggerEvent("magnfier-invisible", _this.imageContainer.current);
        };
        this.imageContainer.current.addEventListener("mouseenter", showMagnifier);
        this.imageContainer.current.addEventListener("mouseleave", hideMagnifier);
        /**
         * Execute a function when someone moves the magnifier glass over the image:
         */
        glass.addEventListener("mousemove", moveMagnifier);
        this.magnifiableImage.current.addEventListener("mousemove", moveMagnifier);
        /**
         * and also for touch screens:
         */
        glass.addEventListener("touchmove", moveMagnifier);
        this.magnifiableImage.current.addEventListener("touchmove", moveMagnifier);
        /**
         * trigger "magnfier-initialized" custom event
         */
        this.triggerEvent("magnifier-initialized", this.imageContainer.current);
    };
    /**
     * @function logError
     * A helper function to log custom error messages
     */
    ReactMagnifier.prototype.logError = function () {
        console.log("%c ReactMagnifier Error: " + this.imageUrlMissingError + ". \n<ReactMagnifier imageUrl={url}/> is required.", "background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;");
    };
    /**
     * @function triggerEvent
     * A helper to dispatch custom events
     * @param eventType {String} - The name/type of event
     * @param element {any} - The DOM element/React component which dispatched the event
     */
    ReactMagnifier.prototype.triggerEvent = function (eventType, element) {
        var event = new CustomEvent(eventType, { detail: element });
        element.dispatchEvent(event);
    };
    ReactMagnifier.prototype.render = function () {
        return (React.createElement("div", { className: "react-magnifier-image-container", ref: this.imageContainer },
            React.createElement("img", { ref: this.magnifiableImage, src: this.props.imageUrl, width: this.props.imageWidth, height: this.props.imageHeight, alt: this.props.imageAltText })));
    };
    /**
     * Set default props
     */
    ReactMagnifier.defaultProps = {
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
        magnifierShadow: true,
        cursor: "none",
        zoomSize: 2,
        getMagnifier: function () { }
    };
    return ReactMagnifier;
}(React.Component));
export default ReactMagnifier;

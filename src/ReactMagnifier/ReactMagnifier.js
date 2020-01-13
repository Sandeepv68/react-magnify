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
/* eslint-disable import/first */
import * as React from "react";
import "./style.css";
var ReactMagnifier = /** @class */ (function (_super) {
    __extends(ReactMagnifier, _super);
    function ReactMagnifier(props) {
        var _this = _super.call(this, props) || this;
        _this.magnifiableImage = React.createRef();
        _this.reactMagnifierGlassClass = "react-magnifier-glass";
        _this.imageUrlMissingError = "Image url is missing!";
        return _this;
    }
    ReactMagnifier.prototype.componentDidMount = function () {
        if (this.isValidProp(this.props.imageUrl)) {
            return this.magnify();
        }
        else {
            return this.logError();
        }
    };
    ReactMagnifier.prototype.componentDidUpdate = function () {
        return this.magnify();
    };
    ReactMagnifier.prototype.isValidProp = function (prop) {
        if (prop && prop !== null && prop !== undefined && prop !== "") {
            return true;
        }
        else {
            return false;
        }
    };
    ReactMagnifier.prototype.magnify = function () {
        var _this = this;
        var w;
        var h;
        var bw;
        /* Create magnifier glass: */
        var glass = document.createElement("DIV");
        glass.setAttribute("class", this.reactMagnifierGlassClass);
        /* Insert magnifier glass: */
        this.magnifiableImage.current.parentElement.insertBefore(glass, this.magnifiableImage.current);
        /* Set background properties for the magnifier glass: */
        // glass.style.display = "none";
        glass.style.width = this.props.magnifierWidth + "px";
        glass.style.height = this.props.magnifierHeight + "px";
        glass.style.borderRadius = this.props.magnifierRadius + "%";
        glass.style.border = this.props.magnifierBorderWidth + "px " + this.props.magnifierBorderStyle + " " + this.props.magnifierBorderColor;
        glass.style.cursor = "" + this.props.cursor;
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
        var moveMagnifier = function (e) {
            var x;
            var y;
            var pos;
            /* Prevent any other actions that may occur when moving over the image */
            e.preventDefault();
            /* Get the cursor's x and y positions: */
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;
            /* Prevent the magnifier glass from being positioned outside the image: */
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
            /* Set the position of the magnifier glass: */
            glass.style.left = x - w + "px";
            glass.style.top = y - h + "px";
            /* Display what the magnifier glass "sees": */
            glass.style.backgroundPosition =
                "-" +
                    (x * _this.props.zoomSize - w + bw) +
                    "px -" +
                    (y * _this.props.zoomSize - h + bw) +
                    "px";
        };
        var getCursorPos = function (e) {
            var a;
            var x;
            var y;
            e = e || window.event;
            /* Get the x and y positions of the image: */
            a = _this.magnifiableImage.current.getBoundingClientRect();
            /* Calculate the cursor's x and y coordinates, relative to the image: */
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        };
        // const showMagnifier = (e: any) => {
        //    e.preventDefault();
        //    glass.style.display = "block";
        // };
        // const hideMagnifier = (e: any) => {
        //    e.preventDefault();
        //    glass.style.display = "none";
        // };
        // glass.addEventListener("mouseenter", showMagnifier);
        // this.magnifiableImage.current.addEventListener("mouseenter", showMagnifier);
        // glass.addEventListener("mouseleave", hideMagnifier);
        // this.magnifiableImage.current.addEventListener("mouseleave", hideMagnifier);
        /* Execute a function when someone moves the magnifier glass over the image: */
        glass.addEventListener("mousemove", moveMagnifier);
        this.magnifiableImage.current.addEventListener("mousemove", moveMagnifier);
        /*and also for touch screens:*/
        glass.addEventListener("touchmove", moveMagnifier);
        this.magnifiableImage.current.addEventListener("touchmove", moveMagnifier);
    };
    ReactMagnifier.prototype.logError = function () {
        console.log("%c ReactMagnifier Error: " + this.imageUrlMissingError + ". \n<ReactMagnifier imageUrl={url}/> is required.", "background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;");
    };
    ReactMagnifier.prototype.render = function () {
        return (React.createElement("div", { className: "react-magnifier-image-container" },
            React.createElement("img", { ref: this.magnifiableImage, src: this.props.imageUrl, width: this.props.imageWidth, height: this.props.imageHeight, alt: this.props.imageAltText })));
    };
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
        cursor: "none",
        zoomSize: 2
    };
    return ReactMagnifier;
}(React.Component));
export default ReactMagnifier;

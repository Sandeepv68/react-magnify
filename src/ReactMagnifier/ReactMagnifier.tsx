import * as React from "react";

import './style.css';

export interface ReactMagnifierProps { zoomSize: number }
export interface ReactMagnifierDefaultState { }

class ReactMagnifier extends React.Component<ReactMagnifierProps, ReactMagnifierDefaultState> {

  private magnifiableImage: React.RefObject<HTMLImageElement>;

  static ReactMagnifierProps = {
    zoomSize: 2
  }

  constructor(props: ReactMagnifierProps) {
    super(props);
    this.magnifiableImage = React.createRef();
  }

  componentDidMount() {
    this.magnify(this.props.zoomSize);
  }

  componentDidUpdate() {
    this.magnify(this.props.zoomSize);
  }

  private magnify(zoom: number) {
    let img = this.magnifiableImage.current;
    let w: number;
    let h: number;
    let bw: number;

    /* Create magnifier glass: */
    let glass = document.createElement("DIV") as HTMLDivElement;
    glass.setAttribute("class", "react-magnifier-glass");

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
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
      if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
      if (x < w / zoom) { x = w / zoom; }
      if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
      if (y < h / zoom) { y = h / zoom; }
      /* Set the position of the magnifier glass: */
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /* Display what the magnifier glass "sees": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    const getCursorPos = (e: any) => {
      let a;
      let x: number;
      let y: number;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }

    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
  }

  render() {
    return (
      <div className="react-magnifier-image-container">
        <img ref={this.magnifiableImage} src="https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" width="600" height="400" alt="Girl" />
      </div>
    );
  }
}

export default ReactMagnifier;
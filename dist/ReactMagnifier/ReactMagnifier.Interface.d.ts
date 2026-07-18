/**
 * ReactMagnifier Component Props Interface
 *
 * @interface ReactMagnifierProps
 * @description Props for configuring the ReactMagnifier component
 */
export interface ReactMagnifierProps {
    /**
     * The URL of the image to magnify
     * @type {string}
     * @required
     */
    imageUrl: string;
    /**
     * Alt text for the image element (accessibility)
     * @type {string}
     * @default "react-magnifier-image"
     */
    imageAltText: string;
    /**
     * Width of the image element (CSS value)
     * @type {number | string}
     * @default "auto"
     */
    imageWidth: number | string;
    /**
     * Height of the image element (CSS value)
     * @type {number | string}
     * @default "auto"
     */
    imageHeight: number | string;
    /**
     * Height of the magnifier glass in pixels
     * @type {number}
     * @default 100
     */
    magnifierHeight: number;
    /**
     * Width of the magnifier glass in pixels
     * @type {number}
     * @default 100
     */
    magnifierWidth: number;
    /**
     * Border radius of the magnifier glass as percentage
     * @type {number}
     * @default 50
     */
    magnifierRadius: number;
    /**
     * CSS border style for the magnifier glass
     * @type {string}
     * @default "solid"
     */
    magnifierBorderStyle: string;
    /**
     * CSS border color for the magnifier glass
     * @type {string}
     * @default "#000"
     */
    magnifierBorderColor: string;
    /**
     * CSS border width for the magnifier glass in pixels
     * @type {number}
     * @default 3
     */
    magnifierBorderWidth: number;
    /**
     * Whether to apply box shadow to the magnifier glass
     * @type {boolean}
     * @default true
     */
    magnifierShadow: boolean;
    /**
     * CSS cursor style for the magnifier glass
     * @type {string}
     * @default "none"
     */
    cursor: string;
    /**
     * Zoom level for the magnified image
     * @type {number}
     * @default 2
     */
    zoomSize: number;
    /**
     * Callback function called when magnifier is initialized
     * Receives the container element as parameter
     * @type {(container: HTMLDivElement | null) => void}
     */
    getMagnifier: (container: HTMLDivElement | null) => void;
    /**
     * Custom CSS class for the image element
     * @type {string}
     * @default ""
     */
    customImgStyles: string;
    /**
     * Custom CSS class for the container element
     * @type {string}
     * @default ""
     */
    customContainerStyles: string;
}
//# sourceMappingURL=ReactMagnifier.Interface.d.ts.map
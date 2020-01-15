/**
 * ReactMagnifier v0.0.4
 * A simple configurable react plugin to perform image magnification
 * written by: Sandeep Vattapparambil
 * email: sandeepv68@gmail.com
 */
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
export default class ReactMagnifier extends React.Component<ReactMagnifierProps, ReactMagnifierDefaultState> {
    /**
     * @constant magnifiableImage - React element reference for image to be magnified
     * @constant imageContainer - React element reference for the conatiner of image to be magnified
     * @constant reactMagnifierGlassClass - CSS class for the magnifier
     * @constant imageUrlMissingError - Input image prop validation error message
     */
    private magnifiableImage;
    private imageContainer;
    private reactMagnifierGlassClass;
    private imageUrlMissingError;
    /**
     * Set default props
     */
    static defaultProps: {
        imageUrl: string;
        imageAltText: string;
        imageWidth: number;
        imageHeight: number;
        magnifierHeight: number;
        magnifierWidth: number;
        magnifierRadius: number;
        magnifierBorderColor: string;
        magnifierBorderStyle: string;
        magnifierBorderWidth: number;
        magnifierShadow: boolean;
        cursor: string;
        zoomSize: number;
        getMagnifier: () => void;
        customImgStyles: string;
        customContainerStyles: string;
    };
    constructor(props: ReactMagnifierProps);
    /**
     * Once component is mounted, validate props and render the magnifier
     * or throw error if props are invalid
     */
    componentDidMount(): void;
    /**
     * re-render magnifier upon component updation
     */
    componentDidUpdate(): void;
    /**
     * @function isValidProp
     * A helper function to validate input props
     * @param prop {String} - The prop to be validated
     * @returns Returns true or false
     */
    private isValidProp;
    /**
     * @function magnify
     * A helper to render magnified image and magnifier with input props
     */
    private magnify;
    /**
     * @function logError
     * A helper function to log custom error messages
     */
    private logError;
    /**
     * @function triggerEvent
     * A helper to dispatch custom events
     * @param eventType {String} - The name/type of event
     * @param element {any} - The DOM element/React component which dispatched the event
     */
    private triggerEvent;
    render(): JSX.Element;
}

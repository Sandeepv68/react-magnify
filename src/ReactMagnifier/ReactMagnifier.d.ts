import * as React from "react";
import { ReactMagnifierProps, ReactMagnifierDefaultState } from "./ReactMagnifier.Interface";
import "./style.css";
export default class ReactMagnifier extends React.Component<ReactMagnifierProps, ReactMagnifierDefaultState> {
    private magnifiableImage;
    private reactMagnifierGlassClass;
    private imageUrlMissingError;
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
        cursor: string;
        zoomSize: number;
    };
    constructor(props: ReactMagnifierProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    private isValidProp;
    private magnify;
    private logError;
    render(): JSX.Element;
}

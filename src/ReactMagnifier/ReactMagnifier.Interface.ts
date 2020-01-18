export interface ReactMagnifierProps {
   imageUrl: string;
   imageAltText: string;
   imageWidth: number | string;
   imageHeight: number | string;
   magnifierHeight: number;
   magnifierWidth: number;
   magnifierRadius: number;
   magnifierBorderStyle: string;
   magnifierBorderColor: string;
   magnifierBorderWidth: number;
   magnifierShadow: boolean;
   cursor: string;
   zoomSize: number;
   getMagnifier: Function;
   customImgStyles: string;
   customContainerStyles: string;
}

export interface ReactMagnifierDefaultState {}

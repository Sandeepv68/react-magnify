export interface ReactMagnifierProps {
   imageUrl: string;
   imageAltText: string;
   imageWidth: number;
   imageHeight: number;
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
}

export interface ReactMagnifierDefaultState {}

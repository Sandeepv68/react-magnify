/**
 * Utility functions for ReactMagnifier component
 */
/**
 * Validates if a string prop is valid and not empty
 * @param prop - The property to validate
 * @returns True if the property is a non-empty string
 */
export declare const isValidProp: (prop: string) => boolean;
/**
 * Logs a styled error message to console
 * @param message - The error message to log
 */
export declare const logMagnifierError: (message: string) => void;
/**
 * Dispatches a custom event on an element
 * @param eventType - The type of custom event to dispatch
 * @param element - The DOM element to dispatch the event on
 */
export declare const triggerCustomEvent: (eventType: string, element: HTMLElement | null) => void;
/**
 * Gets cursor position relative to an image element
 * @param event - The mouse or touch event
 * @param imageElement - The reference image element
 * @returns Object with x and y coordinates
 */
export declare const getCursorPos: (event: MouseEvent | TouchEvent, imageElement: HTMLImageElement | null) => {
    x: number;
    y: number;
};
/**
 * Creates and configures the magnifier glass DOM element
 * @param container - The container to insert the glass into
 * @param imageElement - The image element being magnified
 * @param props - The magnifier configuration properties
 * @returns The created glass element or null if creation failed
 */
export declare const createMagnifierGlass: (container: HTMLDivElement | null, imageElement: HTMLImageElement | null, props: {
    magnifierWidth: number;
    magnifierHeight: number;
    magnifierRadius: number;
    magnifierBorderWidth: number;
    magnifierBorderStyle: string;
    magnifierBorderColor: string;
    magnifierShadow: boolean;
    cursor: string;
    zoomSize: number;
}) => HTMLDivElement | null;
//# sourceMappingURL=utils.d.ts.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
// This is the example demo app entry point
// In production, the library is built from src/export.tsx
import './index.css';
import ReactMagnifier from './ReactMagnifier/ReactMagnifier';
function showEvent(data) {
    if (data) {
        data.addEventListener('magnifier-initialized', (e) => {
            // eslint-disable-next-line no-console
            console.log('Magnifier initialized:', e);
        });
    }
}
// Initialize app after DOM is ready
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const root = document.getElementById('root');
        if (root) {
            const { createRoot } = yield import('react-dom/client');
            const reactRoot = createRoot(root);
            reactRoot.render(_jsx(ReactMagnifier, { zoomSize: 3, imageHeight: 400, imageWidth: 600, magnifierHeight: 200, magnifierWidth: 200, magnifierRadius: 50, magnifierBorderColor: "white", magnifierBorderStyle: "solid", magnifierBorderWidth: 2, cursor: "none", imageUrl: "https://images.unsplash.com/photo-1578663248901-198b64da244e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80", getMagnifier: showEvent, customImgStyles: "myClass", customContainerStyles: "aClass" }));
        }
    });
}
initApp().catch(console.error);

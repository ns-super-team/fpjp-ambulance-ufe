/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface FpjpApp {
        "apiBase": string;
        "basePath": string;
    }
    interface FpjpDepartment {
        "apiBase": string;
        "basePath": string;
        "depId": string;
    }
    interface FpjpDepartmentOverview {
        "apiBase": string;
    }
    interface FpjpEquipmentEditor {
        "apiBase": string;
        "equipment": { id: string; name: string; type: string; count: number; room: { id: string; name: string; }; };
        "rooms": {"id": string, "name": string}[];
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
}
export interface FpjpDepartmentCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLFpjpDepartmentElement;
}
export interface FpjpDepartmentOverviewCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLFpjpDepartmentOverviewElement;
}
export interface FpjpEquipmentEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLFpjpEquipmentEditorElement;
}
declare global {
    interface HTMLFpjpAppElement extends Components.FpjpApp, HTMLStencilElement {
    }
    var HTMLFpjpAppElement: {
        prototype: HTMLFpjpAppElement;
        new (): HTMLFpjpAppElement;
    };
    interface HTMLFpjpDepartmentElementEventMap {
        "clicked": any;
    }
    interface HTMLFpjpDepartmentElement extends Components.FpjpDepartment, HTMLStencilElement {
        addEventListener<K extends keyof HTMLFpjpDepartmentElementEventMap>(type: K, listener: (this: HTMLFpjpDepartmentElement, ev: FpjpDepartmentCustomEvent<HTMLFpjpDepartmentElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLFpjpDepartmentElementEventMap>(type: K, listener: (this: HTMLFpjpDepartmentElement, ev: FpjpDepartmentCustomEvent<HTMLFpjpDepartmentElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLFpjpDepartmentElement: {
        prototype: HTMLFpjpDepartmentElement;
        new (): HTMLFpjpDepartmentElement;
    };
    interface HTMLFpjpDepartmentOverviewElementEventMap {
        "entry-clicked": any;
    }
    interface HTMLFpjpDepartmentOverviewElement extends Components.FpjpDepartmentOverview, HTMLStencilElement {
        addEventListener<K extends keyof HTMLFpjpDepartmentOverviewElementEventMap>(type: K, listener: (this: HTMLFpjpDepartmentOverviewElement, ev: FpjpDepartmentOverviewCustomEvent<HTMLFpjpDepartmentOverviewElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLFpjpDepartmentOverviewElementEventMap>(type: K, listener: (this: HTMLFpjpDepartmentOverviewElement, ev: FpjpDepartmentOverviewCustomEvent<HTMLFpjpDepartmentOverviewElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLFpjpDepartmentOverviewElement: {
        prototype: HTMLFpjpDepartmentOverviewElement;
        new (): HTMLFpjpDepartmentOverviewElement;
    };
    interface HTMLFpjpEquipmentEditorElementEventMap {
        "clicked": any;
    }
    interface HTMLFpjpEquipmentEditorElement extends Components.FpjpEquipmentEditor, HTMLStencilElement {
        addEventListener<K extends keyof HTMLFpjpEquipmentEditorElementEventMap>(type: K, listener: (this: HTMLFpjpEquipmentEditorElement, ev: FpjpEquipmentEditorCustomEvent<HTMLFpjpEquipmentEditorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLFpjpEquipmentEditorElementEventMap>(type: K, listener: (this: HTMLFpjpEquipmentEditorElement, ev: FpjpEquipmentEditorCustomEvent<HTMLFpjpEquipmentEditorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLFpjpEquipmentEditorElement: {
        prototype: HTMLFpjpEquipmentEditorElement;
        new (): HTMLFpjpEquipmentEditorElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLElementTagNameMap {
        "fpjp-app": HTMLFpjpAppElement;
        "fpjp-department": HTMLFpjpDepartmentElement;
        "fpjp-department-overview": HTMLFpjpDepartmentOverviewElement;
        "fpjp-equipment-editor": HTMLFpjpEquipmentEditorElement;
        "my-component": HTMLMyComponentElement;
    }
}
declare namespace LocalJSX {
    interface FpjpApp {
        "apiBase"?: string;
        "basePath"?: string;
    }
    interface FpjpDepartment {
        "apiBase"?: string;
        "basePath"?: string;
        "depId"?: string;
        "onClicked"?: (event: FpjpDepartmentCustomEvent<any>) => void;
    }
    interface FpjpDepartmentOverview {
        "apiBase"?: string;
        "onEntry-clicked"?: (event: FpjpDepartmentOverviewCustomEvent<any>) => void;
    }
    interface FpjpEquipmentEditor {
        "apiBase"?: string;
        "equipment"?: { id: string; name: string; type: string; count: number; room: { id: string; name: string; }; };
        "onClicked"?: (event: FpjpEquipmentEditorCustomEvent<any>) => void;
        "rooms"?: {"id": string, "name": string}[];
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface IntrinsicElements {
        "fpjp-app": FpjpApp;
        "fpjp-department": FpjpDepartment;
        "fpjp-department-overview": FpjpDepartmentOverview;
        "fpjp-equipment-editor": FpjpEquipmentEditor;
        "my-component": MyComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "fpjp-app": LocalJSX.FpjpApp & JSXBase.HTMLAttributes<HTMLFpjpAppElement>;
            "fpjp-department": LocalJSX.FpjpDepartment & JSXBase.HTMLAttributes<HTMLFpjpDepartmentElement>;
            "fpjp-department-overview": LocalJSX.FpjpDepartmentOverview & JSXBase.HTMLAttributes<HTMLFpjpDepartmentOverviewElement>;
            "fpjp-equipment-editor": LocalJSX.FpjpEquipmentEditor & JSXBase.HTMLAttributes<HTMLFpjpEquipmentEditorElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
        }
    }
}

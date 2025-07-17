// noinspection JSUnusedGlobalSymbols

declare global {
    interface Window {
        WebGLRenderingContext: typeof WebGLRenderingContext;
    }
}

export type WebGLContext = WebGLRenderingContext

export interface ShaderProgram {
    program: WebGLProgram;
    timeLocation: WebGLUniformLocation | null;
    resolutionLocation: WebGLUniformLocation | null;
    positionAttributeLocation: number;
    positionBuffer: WebGLBuffer | null;
}

export interface ShaderRefs {
    canvas: HTMLCanvasElement | null;
    gl: WebGLRenderingContext | null;
    program: WebGLProgram | null;
    timeLocation: WebGLUniformLocation | null;
    resolutionLocation: WebGLUniformLocation | null;
    animation: number;
}

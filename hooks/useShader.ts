import {useEffect, useRef} from 'react';
import {ShaderRefs} from '@/types/webgl';

export function useShader(shaderUrl: string) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const shaderRefs = useRef<ShaderRefs>({
        canvas: null,
        gl: null,
        program: null,
        timeLocation: null,
        resolutionLocation: null,
        animation: 0
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
        if(!gl) {
            console.warn('WebGL not supported');
            return;
        }

        shaderRefs.current.canvas = canvas;
        shaderRefs.current.gl = gl;

        const loadShader = async() => {
            try {
                const fragResponse = await fetch(shaderUrl);
                const vertResponse = await fetch(shaderUrl.replace(/frag/g, 'vert'));
                const fragmentShaderSource = await fragResponse.text();
                const vertexShaderSource = await vertResponse.text();

                const webglFragmentShader = transformShaderToWebGL(fragmentShaderSource);

                const program = createShaderProgram(gl, vertexShaderSource, webglFragmentShader);
                if(!program) return;

                shaderRefs.current.program = program;
                shaderRefs.current.timeLocation = gl.getUniformLocation(program, 'iTime');
                shaderRefs.current.resolutionLocation = gl.getUniformLocation(program, 'iResolution');

                const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
                const positionBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                    -1, -1,
                    1, -1,
                    -1, 1,
                    -1, 1,
                    1, -1,
                    1, 1
                ]), gl.STATIC_DRAW);

                function resizeCanvas() {
                    const canvas = shaderRefs.current.canvas;
                    if(!canvas) return;

                    const rect = canvas.getBoundingClientRect();
                    canvas.width = rect.width * window.devicePixelRatio;
                    canvas.height = rect.height * window.devicePixelRatio;

                    if(shaderRefs.current.gl) {
                        shaderRefs.current.gl.viewport(0, 0, canvas.width, canvas.height);
                    }
                }

                function render(time: number) {
                    const {gl, program, timeLocation, resolutionLocation, canvas} = shaderRefs.current;

                    if(!gl || !program || !canvas) return;

                    gl.clearColor(0, 0, 0, 1);
                    gl.clear(gl.COLOR_BUFFER_BIT);

                    gl.useProgram(program);
                    gl.enableVertexAttribArray(positionAttributeLocation);
                    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
                    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

                    if(timeLocation) {
                        gl.uniform1f(timeLocation, time * 0.001);
                    }

                    if(resolutionLocation) {
                        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
                    }

                    gl.drawArrays(gl.TRIANGLES, 0, 6);
                    shaderRefs.current.animation = requestAnimationFrame(render);
                }

                resizeCanvas();
                window.addEventListener('resize', resizeCanvas);
                shaderRefs.current.animation = requestAnimationFrame(render);

            } catch(error) {
                console.error('Failed to load shader:', error);
            }
        };

        loadShader().then();

        return () => {
            window.removeEventListener('resize', () => {
            });
            if(shaderRefs.current.animation) {
                cancelAnimationFrame(shaderRefs.current.animation);
            }
        };
    }, [shaderUrl]);

    return canvasRef;
}

function transformShaderToWebGL(shaderSource: string): string {
    const lines = shaderSource.split('\n');
    const outputLines: string[] = [];

    outputLines.push('#ifdef GL_ES');
    outputLines.push('precision mediump float;');
    outputLines.push('#endif');
    outputLines.push('');
    outputLines.push('uniform float iTime;');
    outputLines.push('uniform vec2 iResolution;');
    outputLines.push('varying vec2 v_texCoord;');
    outputLines.push('');

    let inMainImage = false;

    for(let line of lines) {
        if(line.includes('#ifdef GL_ES') ||
            line.includes('precision mediump float;') ||
            line.includes('uniform iTime;') ||
            line.includes('uniform iResolution;') ||
            line.trim() === '#endif') {
            continue;
        }

        if(line.includes('void mainImage(out vec4 fragColor, in vec2 fragCoord)')) {
            outputLines.push('void main() {');
            inMainImage = true;
            continue;
        }

        if(inMainImage) {
            line = line.replace(/fragCoord/g, '(v_texCoord * iResolution)');
            line = line.replace(/fragColor/g, 'gl_FragColor');
        }

        outputLines.push(line);
    }

    return outputLines.join('\n');
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if(!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        console.error('Shader source:', source);
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createShaderProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram | null {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    if(!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if(!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        return null;
    }

    return program;
}
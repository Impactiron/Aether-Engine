#version 300 es
precision mediump float;

in vec3 v_color;
out vec4 outColor;

void main() {
    outColor = vec4(v_color, 1.0);
}/**
 * AETHER ENGINE - Shader
 * Kompiliert Vertex- und Fragment-Shader und verlinkt sie zu einem WebGLProgram.
 */
export class Shader {
    private _program: WebGLProgram;
    // Cache für Uniform Locations, um gl.getUniformLocation Calls zu minimieren (TODO in Phase C)
    private _uniforms: { [name: string]: WebGLUniformLocation } = {};

    constructor(gl: WebGL2RenderingContext, vertexSrc: string, fragmentSrc: string) {
        const vertexShader = this.compile(gl, vertexSrc, gl.VERTEX_SHADER);
        const fragmentShader = this.compile(gl, fragmentSrc, gl.FRAGMENT_SHADER);

        this._program = gl.createProgram()!;
        gl.attachShader(this._program, vertexShader);
        gl.attachShader(this._program, fragmentShader);
        gl.linkProgram(this._program);

        // Error Handling Linker
        if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
            throw new Error(`Shader Link Error: ${gl.getProgramInfoLog(this._program)}`);
        }

        // Cleanup: Shader Objekte werden nach dem Linken nicht mehr gebraucht
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
    }

    bind(gl: WebGL2RenderingContext): void {
        gl.useProgram(this._program);
    }

    unbind(gl: WebGL2RenderingContext): void {
        gl.useProgram(null);
    }

    getAttributeLocation(gl: WebGL2RenderingContext, name: string): number {
        return gl.getAttribLocation(this._program, name);
    }

    getUniformLocation(gl: WebGL2RenderingContext, name: string): WebGLUniformLocation | null {
        return gl.getUniformLocation(this._program, name);
    }

    // Hilfsfunktion zum Kompilieren
    private compile(gl: WebGL2RenderingContext, source: string, type: number): WebGLShader {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const log = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(`Shader Compile Error (${type === gl.VERTEX_SHADER ? 'Vertex' : 'Fragment'}): ${log}`);
        }
        return shader;
    }
}
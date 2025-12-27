// src/renderer/Shader.ts
/**
 * AETHER ENGINE - Shader
 * Wrapper für WebGLProgram. Kompiliert Vertex- und Fragment-Shader.
 * Managed Uniforms und Attributes.
 */
export class Shader {
    private _program: WebGLProgram;
    private _uniforms: { [name: string]: WebGLUniformLocation } = {};

    constructor(gl: WebGL2RenderingContext, vertexSrc: string, fragmentSrc: string) {
        // 1. Compile Vertex Shader
        const vertexShader = this.compile(gl, vertexSrc, gl.VERTEX_SHADER);

        // 2. Compile Fragment Shader
        const fragmentShader = this.compile(gl, fragmentSrc, gl.FRAGMENT_SHADER);

        // 3. Link Program
        this._program = gl.createProgram()!;
        gl.attachShader(this._program, vertexShader);
        gl.attachShader(this._program, fragmentShader);
        gl.linkProgram(this._program);

        // Error Handling Linker
        if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(this._program);
            throw new Error(`AETHER SHADER LINK ERROR: ${info}`);
        }

        // Cleanup (Shader Objekte werden nach dem Linken nicht mehr gebraucht)
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        // 4. Cache Uniforms
        this.detectUniforms(gl);
    }

    /**
     * Aktiviert diesen Shader für den nächsten Draw Call.
     */
    bind(gl: WebGL2RenderingContext): void {
        gl.useProgram(this._program);
    }

    /**
     * Deaktiviert den Shader.
     */
    unbind(gl: WebGL2RenderingContext): void {
        gl.useProgram(null);
    }

    // --- Uniform Upload Helpers ---

    setUniformMatrix4fv(gl: WebGL2RenderingContext, name: string, data: Float32Array): void {
        if (this._uniforms[name]) {
            gl.uniformMatrix4fv(this._uniforms[name], false, data);
        }
    }

    setUniform3f(gl: WebGL2RenderingContext, name: string, x: number, y: number, z: number): void {
        if (this._uniforms[name]) {
            gl.uniform3f(this._uniforms[name], x, y, z);
        }
    }

    setUniform4fv(gl: WebGL2RenderingContext, name: string, data: Float32Array): void {
        if (this._uniforms[name]) {
            gl.uniform4fv(this._uniforms[name], data);
        }
    }

    get program(): WebGLProgram { return this._program; }

    // --- Internals ---

    private compile(gl: WebGL2RenderingContext, source: string, type: number): WebGLShader {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const log = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            const typeStr = type === gl.VERTEX_SHADER ? 'Vertex' : 'Fragment';
            throw new Error(`AETHER SHADER COMPILE ERROR (${typeStr}): ${log}`);
        }
        return shader;
    }

    private detectUniforms(gl: WebGL2RenderingContext): void {
        const numUniforms = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
        
        for (let i = 0; i < numUniforms; i++) {
            const info = gl.getActiveUniform(this._program, i);
            if (info) {
                const loc = gl.getUniformLocation(this._program, info.name);
                if (loc) {
                    this._uniforms[info.name] = loc;
                }
            }
        }
    }
}
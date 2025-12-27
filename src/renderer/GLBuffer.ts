// src/renderer/GLBuffer.ts
/**
 * AETHER ENGINE - GLBuffer
 * Wrapper für WebGL Buffer (VBOs, EBOs).
 * Lädt Daten in den VRAM.
 */
export class GLBuffer {
    private _buffer: WebGLBuffer;
    private _target: number; // gl.ARRAY_BUFFER oder gl.ELEMENT_ARRAY_BUFFER
    private _size: number = 0; // Anzahl der Elemente (nicht Bytes)

    constructor(gl: WebGL2RenderingContext, target: number, data: Float32Array | Uint16Array) {
        this._buffer = gl.createBuffer()!;
        this._target = target;
        
        this.bind(gl);
        
        // STATIC_DRAW: Daten ändern sich selten (perfekt für statische Meshes)
        gl.bufferData(this._target, data, gl.STATIC_DRAW);
        
        this._size = data.length;
        
        this.unbind(gl);
    }

    bind(gl: WebGL2RenderingContext): void {
        gl.bindBuffer(this._target, this._buffer);
    }

    unbind(gl: WebGL2RenderingContext): void {
        gl.bindBuffer(this._target, null);
    }

    destroy(gl: WebGL2RenderingContext): void {
        gl.deleteBuffer(this._buffer);
    }

    get size(): number { return this._size; }
}
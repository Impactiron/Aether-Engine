// src/core/Renderer.ts
import { Shader } from '../renderer/Shader';

/**
 * AETHER ENGINE - Renderer
 * Abstrahiert WebGL Calls und verwaltet den Render-State.
 */
export class Renderer {
    private _gl: WebGL2RenderingContext;

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;

        // GLOBAL SETTINGS
        console.log("AETHER RENDERER: Setting up GL State...");
        
        // Z-Buffer aktivieren (Objekte verdecken sich korrekt)
        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.depthFunc(this._gl.LEQUAL);

        // Backface Culling (Rückseiten nicht zeichnen)
        this._gl.enable(this._gl.CULL_FACE);
        this._gl.cullFace(this._gl.BACK);
    }

    public setViewport(width: number, height: number): void {
        this._gl.viewport(0, 0, width, height);
    }

    public clear(): void {
        // Löscht Farbe und Tiefen-Informationen
        this._gl.clearColor(0.1, 0.1, 0.1, 1.0); // Dark Gray Background
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    }

    /**
     * Der Low-Level Draw Call.
     * Bindet Shader, VAO und führt drawElements aus.
     */
    public draw(vao: WebGLVertexArrayObject, indexCount: number, shader: Shader): void {
        // 1. Shader aktivieren
        shader.bind(this._gl);

        // 2. Geometrie (VAO) binden
        this._gl.bindVertexArray(vao);

        // 3. Draw Elements (Index Buffer Draw Call)
        // UNSIGNED_SHORT = Uint16Array
        this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, 0);

        // 4. Cleanup
        this._gl.bindVertexArray(null);
        shader.unbind(this._gl);
    }

    // Getter für direkten GL Zugriff (für Init Code)
    get gl(): WebGL2RenderingContext { return this._gl; }
}
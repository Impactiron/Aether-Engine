import { Shader } from './Shader';

/**
 * AETHER ENGINE - Renderer (Phase B)
 * Abstrahiert WebGL Calls und managed den Global State.
 */
export class Renderer {
    private _gl: WebGL2RenderingContext;

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;

        // Global Settings
        // Z-Buffer aktivieren (damit Objekte hinten nicht Objekte vorne übermalen)
        this._gl.enable(this._gl.DEPTH_TEST);
        this._gl.depthFunc(this._gl.LEQUAL);

        // Backface Culling (Rückseiten von Dreiecken nicht zeichnen -> Performance)
        this._gl.enable(this._gl.CULL_FACE);
        this._gl.cullFace(this._gl.BACK);
    }

    public setViewport(width: number, height: number): void {
        this._gl.viewport(0, 0, width, height);
    }

    public clear(): void {
        // Setzt die Hintergrundfarbe auf ein dunkles Grau
        this._gl.clearColor(0.1, 0.1, 0.1, 1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    }

    public draw(vao: WebGLVertexArrayObject, indexCount: number, shader: Shader): void {
        shader.bind(this._gl);
        this._gl.bindVertexArray(vao);

        // Draw Elements = Nutzung von Index Buffer (Effizienter)
        // UNSIGNED_SHORT = Uint16Array (Max 65k Vertices pro Mesh)
        this._gl.drawElements(this._gl.TRIANGLES, indexCount, this._gl.UNSIGNED_SHORT, 0);

        this._gl.bindVertexArray(null);
        shader.unbind(this._gl);
    }
}
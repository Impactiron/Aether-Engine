/**
 * AETHER ENGINE - Renderer (Placeholder Phase A)
 * Abstrahiert WebGL Calls.
 */
export class Renderer {
    private _gl: WebGL2RenderingContext;

    constructor(gl: WebGL2RenderingContext) {
        this._gl = gl;
    }

    public clear(): void {
        // Setzt die Hintergrundfarbe auf ein dunkles Grau
        this._gl.clearColor(0.1, 0.1, 0.1, 1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
    }
}
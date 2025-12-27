import { Vector3 } from './Vector3';

/**
 * AETHER ENGINE - Matrix4
 * Eine 4x4 Matrix Klasse. 
 * WICHTIG: WebGL nutzt Column-Major Order. 
 * Das Array layout ist:
 * 0  4  8  12
 * 1  5  9  13
 * 2  6  10 14
 * 3  7  11 15
 */
export class Matrix4 {
    public data: Float32Array;

    constructor() {
        this.data = new Float32Array(16);
        this.identity();
    }

    /**
     * Setzt die Matrix auf die Einheitsmatrix zurück.
     */
    identity(): this {
        this.data.fill(0);
        this.data[0] = 1;
        this.data[5] = 1;
        this.data[10] = 1;
        this.data[15] = 1;
        return this;
    }

    /**
     * Verschiebt die Matrix (Translation).
     */
    translate(v: Vector3): this {
        const x = v.x, y = v.y, z = v.z;
        const e = this.data;

        e[12] = e[0] * x + e[4] * y + e[8]  * z + e[12];
        e[13] = e[1] * x + e[5] * y + e[9]  * z + e[13];
        e[14] = e[2] * x + e[6] * y + e[10] * z + e[14];
        e[15] = e[3] * x + e[7] * y + e[11] * z + e[15];

        return this;
    }

    /**
     * Rotiert um die X-Achse (in Radians).
     */
    rotateX(rad: number): this {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const e = this.data;

        // Temporäre Kopien der betroffenen Spalten
        const a10 = e[4], a11 = e[5], a12 = e[6], a13 = e[7];
        const a20 = e[8], a21 = e[9], a22 = e[10], a23 = e[11];

        e[4] = a10 * c + a20 * s;
        e[5] = a11 * c + a21 * s;
        e[6] = a12 * c + a22 * s;
        e[7] = a13 * c + a23 * s;

        e[8] = a10 * -s + a20 * c;
        e[9] = a11 * -s + a21 * c;
        e[10] = a12 * -s + a22 * c;
        e[11] = a13 * -s + a23 * c;

        return this;
    }

    rotateY(rad: number): this {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const e = this.data;

        const a00 = e[0], a01 = e[1], a02 = e[2], a03 = e[3];
        const a20 = e[8], a21 = e[9], a22 = e[10], a23 = e[11];

        e[0] = a00 * c - a20 * s;
        e[1] = a01 * c - a21 * s;
        e[2] = a02 * c - a22 * s;
        e[3] = a03 * c - a23 * s;

        e[8] = a00 * s + a20 * c;
        e[9] = a01 * s + a21 * c;
        e[10] = a02 * s + a22 * c;
        e[11] = a03 * s + a23 * c;

        return this;
    }

    rotateZ(rad: number): this {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const e = this.data;

        const a00 = e[0], a01 = e[1], a02 = e[2], a03 = e[3];
        const a10 = e[4], a11 = e[5], a12 = e[6], a13 = e[7];

        e[0] = a00 * c + a10 * s;
        e[1] = a01 * c + a11 * s;
        e[2] = a02 * c + a12 * s;
        e[3] = a03 * c + a13 * s;

        e[4] = a00 * -s + a10 * c;
        e[5] = a01 * -s + a11 * c;
        e[6] = a02 * -s + a12 * c;
        e[7] = a03 * -s + a13 * c;

        return this;
    }

    /**
     * Skaliert die Matrix.
     */
    scale(v: Vector3): this {
        const x = v.x, y = v.y, z = v.z;
        const e = this.data;

        e[0] *= x; e[1] *= x; e[2] *= x; e[3] *= x;
        e[4] *= y; e[5] *= y; e[6] *= y; e[7] *= y;
        e[8] *= z; e[9] *= z; e[10] *= z; e[11] *= z;

        return this;
    }

    /**
     * Multipliziert diese Matrix mit einer anderen (A = A * B).
     */
    multiply(mat: Matrix4): this {
        const a = this.data;
        const b = mat.data;
        const out = new Float32Array(16);

        // Zeile 0
        out[0] = a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3];
        out[1] = a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3];
        out[2] = a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3];
        out[3] = a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3];

        // Zeile 1
        out[4] = a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7];
        out[5] = a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7];
        out[6] = a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7];
        out[7] = a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7];

        // Zeile 2
        out[8] = a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11];
        out[9] = a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11];
        out[10] = a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11];
        out[11] = a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11];

        // Zeile 3
        out[12] = a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15];
        out[13] = a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15];
        out[14] = a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15];
        out[15] = a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15];

        this.data = out;
        return this;
    }

    // --- Statische Methoden (Placeholder für Phase B) ---
    static perspective(fov: number, aspect: number, near: number, far: number): Matrix4 {
        const m = new Matrix4();
        // TODO: Implementierung in Phase B
        return m;
    }

    static orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): Matrix4 {
        const m = new Matrix4();
        // TODO: Implementierung in Phase B
        return m;
    }

    static lookAt(eye: Vector3, center: Vector3, up: Vector3): Matrix4 {
        const m = new Matrix4();
        // TODO: Implementierung in Phase B
        return m;
    }
}
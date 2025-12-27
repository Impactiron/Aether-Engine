/**
 * AETHER ENGINE - Vector3
 * Eine 3-Komponenten Vektor-Klasse basierend auf Float32Array für WebGL-Performance.
 */
export class Vector3 {
    public data: Float32Array;

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.data = new Float32Array([x, y, z]);
    }

    // Getter & Setter für bequemeren Zugriff
    get x(): number { return this.data[0]; }
    set x(v: number) { this.data[0] = v; }

    get y(): number { return this.data[1]; }
    set y(v: number) { this.data[1] = v; }

    get z(): number { return this.data[2]; }
    set z(v: number) { this.data[2] = v; }

    /**
     * Addiert einen Vektor zu diesem.
     */
    add(v: Vector3): this {
        this.data[0] += v.x;
        this.data[1] += v.y;
        this.data[2] += v.z;
        return this;
    }

    /**
     * Subtrahiert einen Vektor von diesem.
     */
    subtract(v: Vector3): this {
        this.data[0] -= v.x;
        this.data[1] -= v.y;
        this.data[2] -= v.z;
        return this;
    }

    /**
     * Skaliert den Vektor (Multiplikation mit Skalar).
     */
    scale(s: number): this {
        this.data[0] *= s;
        this.data[1] *= s;
        this.data[2] *= s;
        return this;
    }

    /**
     * Normalisiert den Vektor (Länge = 1).
     */
    normalize(): this {
        const len = this.magnitude();
        if (len > 0.00001) {
            this.scale(1.0 / len);
        } else {
            this.data[0] = 0;
            this.data[1] = 0;
            this.data[2] = 0;
        }
        return this;
    }

    /**
     * Berechnet die Länge des Vektors.
     */
    magnitude(): number {
        return Math.sqrt(
            this.data[0] * this.data[0] +
            this.data[1] * this.data[1] +
            this.data[2] * this.data[2]
        );
    }

    /**
     * Skalarprodukt (Dot Product).
     * Wichtig für Beleuchtungsberechnungen (Winkel zwischen Vektoren).
     */
    dot(v: Vector3): number {
        return (
            this.data[0] * v.x +
            this.data[1] * v.y +
            this.data[2] * v.z
        );
    }

    /**
     * Kreuzprodukt (Cross Product).
     * Erzeugt einen Vektor, der senkrecht auf beiden steht.
     */
    cross(v: Vector3): Vector3 {
        const ax = this.data[0], ay = this.data[1], az = this.data[2];
        const bx = v.x, by = v.y, bz = v.z;

        const res = new Vector3();
        res.x = ay * bz - az * by;
        res.y = az * bx - ax * bz;
        res.z = ax * by - ay * bx;
        return res;
    }

    // Statische Hilfsvektoren
    static get UP(): Vector3 { return new Vector3(0, 1, 0); }
    static get FORWARD(): Vector3 { return new Vector3(0, 0, 1); }
    static get ZERO(): Vector3 { return new Vector3(0, 0, 0); }
}
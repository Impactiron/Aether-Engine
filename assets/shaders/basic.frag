precision mediump float; // Wichtig für WebGL Kompatibilität

varying vec3 vColor;     // Empfangen vom Vertex Shader

void main() {
    // Output der Farbe, Alpha ist fest auf 1.0 gesetzt
    gl_FragColor = vec4(vColor, 1.0);
}
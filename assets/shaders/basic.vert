attribute vec3 position; // Input Position
attribute vec3 color;    // Input Vertex-Color

varying vec3 vColor;     // Weitergabe an Fragment Shader

// Model-View-Projection Matrix (Standard für 2D/3D Engines)
uniform mat4 uMVP; 

void main() {
    // Weitergabe der Farbe
    vColor = color;
    
    // Berechnung der finalen Position
    gl_Position = uMVP * vec4(position, 1.0);
}
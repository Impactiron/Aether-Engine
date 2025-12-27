// src/main.ts
import { Engine } from './core/Engine';
import { Shader } from './renderer/Shader';
import { GLBuffer } from './renderer/GLBuffer';
import { Matrix4 } from './math/Matrix4';

// BASIC SHADERS (Hardcoded for Test)
const vsSource = `#version 300 es
layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_color;

uniform mat4 u_model;
uniform mat4 u_view;
uniform mat4 u_projection;

out vec3 v_color;

void main() {
    v_color = a_color;
    gl_Position = u_projection * u_view * u_model * vec4(a_position, 1.0);
}
`;

const fsSource = `#version 300 es
precision mediump float;

in vec3 v_color;
out vec4 outColor;

void main() {
    outColor = vec4(v_color, 1.0);
}
`;

window.addEventListener('DOMContentLoaded', () => {
    try {
        const engine = new Engine('game-canvas');
        const gl = engine.renderer.gl;

        // --- 1. SETUP RESOURCES (Manuell) ---
        
        // Shader kompilieren
        const shader = new Shader(gl, vsSource, fsSource);

        // Geometrie definieren (Buntes Dreieck)
        const vertices = new Float32Array([
            // Position (XYZ)    // Color (RGB)
             0.0,  0.5, 0.0,     1.0, 0.0, 0.0, // Top Red
            -0.5, -0.5, 0.0,     0.0, 1.0, 0.0, // Bottom Left Green
             0.5, -0.5, 0.0,     0.0, 0.0, 1.0  // Bottom Right Blue
        ]);

        const indices = new Uint16Array([
            0, 1, 2
        ]);

        // VAO & Buffers erstellen
        const vao = gl.createVertexArray()!;
        gl.bindVertexArray(vao);

        // VBO (Vertex Data)
        const vbo = new GLBuffer(gl, gl.ARRAY_BUFFER, vertices);
        
        // Attributes konfigurieren (Stride = 6 Floats: 3 Pos + 3 Color)
        const stride = 6 * 4; // 4 Bytes pro Float

        // Pos: Loc 0, Offset 0
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0);

        // Color: Loc 1, Offset 3 Floats
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 3, gl.FLOAT, false, stride, 3 * 4);

        // EBO (Indices)
        const ebo = new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, indices);

        gl.bindVertexArray(null); // Clean unbind

        // Matrizen (Identity for now)
        const model = new Matrix4();
        const view = new Matrix4();
        const projection = new Matrix4();

        // --- 2. RENDER LOOP INJECTION ---
        engine.onRender = () => {
            shader.bind(gl);

            // Upload Uniforms
            shader.setUniformMatrix4fv(gl, "u_model", model.data);
            shader.setUniformMatrix4fv(gl, "u_view", view.data);
            shader.setUniformMatrix4fv(gl, "u_projection", projection.data);

            // Draw
            engine.renderer.draw(vao, indices.length, shader);
        };

        // Zündung
        engine.start();
        (window as any).aether = engine;

    } catch (e) {
        console.error("AETHER ENGINE CRITICAL FAILURE:", e);
    }
});
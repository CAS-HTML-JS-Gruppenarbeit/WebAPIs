// Copied from https://indigocode.dev/tutorials/webgl/01-hello-triangle

function runDemo() {
    const canvas = document.getElementById("demo-canvas");
    if (!canvas) {
        console.error("Cannot get demo-canvas reference. Check for typos.");
        return;
    }

    const gl = canvas.getContext("webgl2");
    if (!gl) {
        console.error("Cannot get WebGL context. Try a different device or browser.");
        return;
    }

    // Raw Vertices: Koordinaten
    const triangleVerticies = [
        // Top middle
        0.0, 0.5,
        // Bottom left
        -0.5, -0.5,
        // Bottom right
        0.5, -0.5,
    ];

    // von JS 64-bit floating point number in GPU bevorzugte 32-bit floats umformatieren
    const triangleGeoCpuBuffer = new Float32Array(triangleVerticies);

    // WebGLBuffer für GPU Memory
    const triangleGeoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleGeoCpuBuffer, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Vertex Shader -> Koordinaten als Punkte setzen
    const vertexShaderSourceCode = `#version 300 es
  precision mediump float;

  in vec2 vertexPosition;

  void main() {
    gl_Position = vec4(vertexPosition, 0.0, 1.0);
  }`;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSourceCode);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        const errorMessage = gl.getShaderInfoLog(vertexShader);
        console.error(`Failed to compile vertex shader: ${errorMessage}`);
        return;
    }

    // Fragment Shader -> Flächen zu Pixel rastern und Pixel einfärben
    const fragmentShaderSourceCode = `#version 300 es
  precision mediump float;

  out vec4 outputColor;

  void main() {
    outputColor = vec4(0.294, 0.0, 0.51, 1.0);
  }`;

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        const errorMessage = gl.getShaderInfoLog(fragmentShader);
        console.error(`Failed to compile fragment shader: ${errorMessage}`);
        return;
    }

    // Vertex und Fragement Shader zu WebGLProgram zusammenfügen
    const helloTriangleProgram = gl.createProgram();
    gl.attachShader(helloTriangleProgram, vertexShader);
    gl.attachShader(helloTriangleProgram, fragmentShader);
    gl.linkProgram(helloTriangleProgram);
    if (!gl.getProgramParameter(helloTriangleProgram, gl.LINK_STATUS)) {
        const errorMessage = gl.getProgramInfoLog(helloTriangleProgram);
        console.error(`Failed to link GPU program: ${errorMessage}`);
        return;
    }

    const vertexPositionAttributeLocation = gl.getAttribLocation(
        helloTriangleProgram,
        "vertexPosition"
    );
    if (vertexPositionAttributeLocation < 0) {
        console.error(`Failed to get attribute location for vertexPosition`);
        return;
    }

    // Loading finished! Print a message indicating that.
    console.log('WebGL resources successfully initialized! Ready for render 😁');

    //
    // RENDER FRAME
    canvas.width = canvas.clientWidth;   // * window.devicePixelRatio if you want
    canvas.height = canvas.clientHeight; // * window.devicePixelRatio if you want
    gl.viewport(0, 0, canvas.width, canvas.height);

    gl.clearColor(0.08, 0.08, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(helloTriangleProgram);

    gl.enableVertexAttribArray(vertexPositionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    gl.vertexAttribPointer(
        /* index: vertex attrib location */
        vertexPositionAttributeLocation,
        /* size: number of components in the attribute */
        2,
        /* type: type of data in the GPU buffer for this attribute */
        gl.FLOAT,
        /* normalized: if type=float and is writing to a vec(n) float input, should WebGL normalize the ints first? */
        false,
        /* stride: bytes between starting byte of attribute for a vertex and the same attrib for the next vertex */
        2 * Float32Array.BYTES_PER_ELEMENT,
        /* offset: bytes between the start of the buffer and the first byte of the attribute */
        0
    );

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

runDemo();
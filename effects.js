/**
 * effects.js
 * Encapsulates the WebGL liquid shader and particle effects.
 * Automatically runs on DOMContentLoaded if the corresponding elements exist.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initWebGLShader();
});

function initParticles() {
  const pContainer = document.getElementById('particles-container');
  if (!pContainer) return;

  const PARTICLE_COUNT = 80;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    
    // Randomize starting position
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 100 + 'vh';
    
    // Randomize animation duration and delay
    const dur = 4 + Math.random() * 6; // 4s to 10s
    const delay = Math.random() * 8; // 0s to 8s
    
    // Some vary slightly in size
    const size = Math.random() * 2 + 1; // 1px to 3px
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    
    p.style.animation = `particleFloat ${dur}s linear ${delay}s infinite`;

    pContainer.appendChild(p);
  }
}

function initWebGLShader() {
  const canvas = document.getElementById('glcanvas');
  if (!canvas) return;

  const gl = canvas.getContext('webgl');
  if (!gl) return;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;

    vec2 hash(vec2 p) {
      p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
      return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
    }

    float noise(vec2 p) {
      const float K1 = 0.366025404;
      const float K2 = 0.211324865;
      vec2 i = floor(p + (p.x + p.y) * K1);
      vec2 a = p - i + (i.x + i.y) * K2;
      float m = step(a.y, a.x);
      vec2 o = vec2(m, 1.0 - m);
      vec2 b = a - o + K2;
      vec2 c = a - 1.0 + 2.0 * K2;
      vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
      vec3 n = h*h*h*h * vec3(dot(a, hash(i+0.0)), dot(b, hash(i+o)), dot(c, hash(i+1.0)));
      return dot(n, vec3(70.0));
    }

    float fbm(vec2 uv) {
      float f = 0.0;
      mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
      f += 0.5000 * noise(uv); uv = m * uv;
      f += 0.2500 * noise(uv); uv = m * uv;
      f += 0.1250 * noise(uv); uv = m * uv;
      f += 0.0625 * noise(uv); uv = m * uv;
      return f;
    }

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.y;
      vec2 q = vec2(0.);
      q.x = fbm(st + 0.02 * u_time);
      q.y = fbm(st + vec2(1.0));

      vec2 r = vec2(0.);
      r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.12 * u_time);
      r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.10 * u_time);

      float f = fbm(st + r);
      float veins = abs(sin(f * 3.0 + u_time * 0.3));
      veins = smoothstep(0.93, 1.0, veins); 

      float faintVeins = smoothstep(0.85, 1.0, abs(sin(f * 6.0 - u_time * 0.1))) * 0.2;
      float fluid = veins + faintVeins;

      vec3 baseColor = vec3(0.01, 0.01, 0.01);
      vec3 orangeColor = vec3(1.0, 0.4, 0.0);
      vec3 purpleColor = vec3(0.6, 0.1, 0.9);

      vec3 col = mix(baseColor, orangeColor, fluid);
      col = mix(col, purpleColor, smoothstep(0.97, 1.0, abs(sin(f * 3.0 + u_time * 0.3))));
      col *= 0.55; 

      vec2 center = gl_FragCoord.xy / u_resolution.xy - 0.5;
      col *= 1.0 - dot(center, center) * 1.5;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
    return shader;
  }

  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vertexShader || !fragmentShader) return;

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [
    -1.0,  1.0,
     1.0,  1.0,
    -1.0, -1.0,
     1.0, -1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const vertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
  gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vertexPosition);

  const uResolution = gl.getUniformLocation(shaderProgram, 'u_resolution');
  const uTime = gl.getUniformLocation(shaderProgram, 'u_time');
  
  let startTime = Date.now();

  function renderGL() {
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, (Date.now() - startTime) / 1000.0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(renderGL);
  }
  
  renderGL();
}

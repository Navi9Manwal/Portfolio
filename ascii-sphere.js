// Perfectly Round 3D Particle Cloud Sphere Engine
function initAsciiSphere() {
  const canvas = document.getElementById("ascii-canvas");
  if (!canvas) return;

  const width = 70;
  const height = 36;
  const numPoints = 1600; // Dense particle distribution
  const radius = 14;      // Reduced radius for smaller scale
  const distance = 40;

  let A = 0; // Rotation angle (X-axis)
  let B = 0; // Rotation angle (Y-axis)

  // Uniform spherical distribution using Fibonacci Spiral
  const points = [];
  const phiStep = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < numPoints; i++) {
    const y = 1 - (i / (numPoints - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * phiStep;

    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;

    points.push({ x: x * radius, y: y * radius, z: z * radius });
  }

  // Particle density depth scale
  const asciiChars = [" ", ".", "·", "'", "`", ":", "°", "*", "•"];

  function renderFrame() {
    const buffer = new Array(width * height).fill(" ");
    const zBuffer = new Array(width * height).fill(-Infinity);

    const cosA = Math.cos(A), sinA = Math.sin(A);
    const cosB = Math.cos(B), sinB = Math.sin(B);
    
    // Exact font aspect ratio multiplier for a 1:1 perfectly round circle
    const fontAspect = 0.48; 

    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      // 1. Y-axis Rotation
      const x1 = p.x * cosB + p.z * sinB;
      const y1 = p.y;
      const z1 = -p.x * sinB + p.z * cosB;

      // 2. X-axis Rotation
      const x2 = x1;
      const y2 = y1 * cosA - z1 * sinA;
      const z2 = y1 * sinA + z1 * cosA;

      // 3. Perspective Projection
      const ooz = 1 / (z2 + distance);
      const xp = Math.floor(width / 2 + (x2 * ooz * distance * 1.35));
      const yp = Math.floor(height / 2 + (y2 * ooz * distance * 1.35 * fontAspect));

      const idx = xp + yp * width;

      if (xp >= 0 && xp < width && yp >= 0 && yp < height) {
        if (z2 > zBuffer[idx]) {
          zBuffer[idx] = z2;

          // Depth-based particle brightness mapping
          const normZ = (z2 + radius) / (2 * radius);
          const charIdx = Math.floor(Math.max(0, Math.min(1, normZ)) * (asciiChars.length - 1));

          buffer[idx] = asciiChars[charIdx];
        }
      }
    }

    // Build grid string
    let output = "";
    for (let i = 0; i < buffer.length; i++) {
      output += buffer[i];
      if ((i + 1) % width === 0) output += "\n";
    }

    canvas.textContent = output;

    A += 0.012;
    B += 0.008;
  }

  setInterval(renderFrame, 30);
}

document.addEventListener("DOMContentLoaded", initAsciiSphere);
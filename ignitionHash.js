const ignitionFeatures = async (hash) => {
  const features = [];
  const matrices = [];
  const shapes = [];
  const stack = [];
  const rule = {};
  let NR = 0;
  let NC = 0;
  let FT = 0;
  let transformScene = null;
  let nFrames = 0;
  let hue = 0;
  let startRule = "start";
  let seed = parseInt(hash.slice(0, 16), 16);
  features.push("Seed: " + seed);
  let minSize = 0.01;
  let maxDepth = 10000000;
  let minComplexity = 1;
  const transforms = {
    x(m, v) {
      m[12] += m[0] * v;
      m[13] += m[1] * v;
      m[14] += m[2] * v;
    },
    y(m, v) {
      m[12] += m[4] * v;
      m[13] += m[5] * v;
      m[14] += m[6] * v;
    },
    z(m, v) {
      m[12] += m[8] * v;
      m[13] += m[9] * v;
      m[14] += m[10] * v;
    },
    s(m, v) {
      const a = Array.isArray(v);
      const x = a ? v[0] : v;
      const y = a ? v[1] : x;
      const z = a ? v[2] : x;
      m[0] *= x;
      m[1] *= x;
      m[2] *= x;
      m[3] *= x;
      m[4] *= y;
      m[5] *= y;
      m[6] *= y;
      m[7] *= y;
      m[8] *= z;
      m[9] *= z;
      m[10] *= z;
      m[11] *= z;
    },
    rx(m, v) {
      const rad = Math.PI * (v / 180);
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      const a10 = m[4];
      const a11 = m[5];
      const a12 = m[6];
      const a13 = m[7];
      const a20 = m[8];
      const a21 = m[9];
      const a22 = m[10];
      const a23 = m[11];
      m[4] = a10 * c + a20 * s;
      m[5] = a11 * c + a21 * s;
      m[6] = a12 * c + a22 * s;
      m[7] = a13 * c + a23 * s;
      m[8] = a10 * -s + a20 * c;
      m[9] = a11 * -s + a21 * c;
      m[10] = a12 * -s + a22 * c;
      m[11] = a13 * -s + a23 * c;
    },
    ry(m, v) {
      const rad = Math.PI * (v / 180);
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      const a00 = m[0];
      const a01 = m[1];
      const a02 = m[2];
      const a03 = m[3];
      const a20 = m[8];
      const a21 = m[9];
      const a22 = m[10];
      const a23 = m[11];
      m[0] = a00 * c + a20 * -s;
      m[1] = a01 * c + a21 * -s;
      m[2] = a02 * c + a22 * -s;
      m[3] = a03 * c + a23 * -s;
      m[8] = a00 * s + a20 * c;
      m[9] = a01 * s + a21 * c;
      m[10] = a02 * s + a22 * c;
      m[11] = a03 * s + a23 * c;
    },
    rz(m, v) {
      const rad = Math.PI * (v / 180);
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      const a00 = m[0];
      const a01 = m[1];
      const a02 = m[2];
      const a03 = m[3];
      const a10 = m[4];
      const a11 = m[5];
      const a12 = m[6];
      const a13 = m[7];
      m[0] = a00 * c + a10 * s;
      m[1] = a01 * c + a11 * s;
      m[2] = a02 * c + a12 * s;
      m[3] = a03 * c + a13 * s;
      m[4] = a00 * -s + a10 * c;
      m[5] = a01 * -s + a11 * c;
      m[6] = a02 * -s + a12 * c;
      m[7] = a03 * -s + a13 * c;
    },
  };
  let nCubes = 0;
  const pushGeometry = (m, t, shape, nv) => {
    const s = copy(m);
    for (const c in t) {
      transforms[c](s, t[c]);
    }
    s[22] = shape;
    matrices.push(s);
  };
  const PYRAMID = (m, t) => {
    pushGeometry(m, t, 2, 18);
  };
  const CUBE = (m, t) => {
    pushGeometry(m, t, 1, 36);
  };
  const SIZE = (m) => {
    return Math.min(
      m[0] * m[0] + m[1] * m[1] + m[2] * m[2],
      m[4] * m[4] + m[5] * m[5] + m[6] * m[6],
      m[8] * m[8] + m[9] * m[9] + m[10] * m[10]
    );
  };
  const random = (_) => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const randint = (s, e = 0) => {
    if (e === 0) {
      e = s;
      s = 0;
    }
    return Math.floor(s + random() * (e - s + 1));
  };
  const transform = (s, p) => {
    const m = copy(s);
    m[19]++;
    for (const c in p) transforms[c](m, p[c]);
    if (minSize === 0) return m;
    else {
      if (SIZE(m) < minSize) m[20] = -1;
      return m;
    }
  };
  const copy = (s) => {
    return [
      s[0],
      s[1],
      s[2],
      s[3],
      s[4],
      s[5],
      s[6],
      s[7],
      s[8],
      s[9],
      s[10],
      s[11],
      s[12],
      s[13],
      s[14],
      s[15],
      s[16],
      s[17],
      s[18],
      s[19],
      s[20],
      s[21],
      s[22],
    ];
  };
  const runshapes = (start, t) => {
    let comp = 0;
    let minComp = minComplexity;
    do {
      comp = 0;
      stack.length = 0;
      matrices.length = 0;
      NR = 0;
      FT = 0;
      nFrames = 0;
      NC = 0;
      nCubes = 0;
      rule[start](
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
        t
      );
      do {
        const s = stack.shift();
        if (s !== undefined && s[19] <= maxDepth) {
          shapes[s[21]](s);
          NR++;
          comp++;
        }
      } while (stack.length);
    } while (comp < minComp-- || NC < 2);
  };
  const singlerule = (i) => {
    return (s, t) => {
      s = transform(s, t);
      if (s[20] === -1) return;
      s[21] = i;
      stack.push(s);
    };
  };
  const randomrule = (totalWeight, weight, index, len) => {
    return (s, t) => {
      s = transform(s, t);
      if (s[20] === -1) return;
      let w = 0;
      const r = random() * totalWeight;
      for (let i = 0; i < len; i++) {
        w += weight[i];
        if (r <= w) {
          s[21] = index[i];
          stack.push(s);
          return;
        }
      }
    };
  };
  const newStructure = () => {
    setup();
    runshapes(startRule, transformScene || {});
    if (M === true) features.push("Hue: " + (hue % 360));
    features.push("Number of rules executed: " + NR);
    features.push("Number of Fractal Subdivisions: " + FT);
    features.push("Number of Frames: " + nFrames);
    features.push("Number of Lasers: " + NC);
    features.push("Number of Cubes: " + nCubes);
  };
  const structure = (setup, rules) => {
    shapes.length = 0;
    for (const namerule in rules) {
      const r = rules[namerule];
      if (Array.isArray(r)) {
        let totalWeight = 0;
        const weight = [];
        const index = [];
        for (let i = 0; i < r.length; i += 2) {
          totalWeight += r[i];
          shapes.push(r[i + 1]);
          weight.push(r[i]);
          index.push(shapes.length - 1);
        }
        rule[namerule] = randomrule(totalWeight, weight, index, index.length);
      } else {
        shapes.push(r);
        rule[namerule] = singlerule(shapes.length - 1);
      }
    }
    newStructure();
  };
  random();
  const M = random() > 0.05 ? true : false;
  const G = random() > 0.05 ? 1 : 2;
  const E = random() > 0.02 ? false : true;
  const R = random() > 0.05 ? 0.55 : 0.76 * G;
  const N = random() > 0.5 ? "d1" : "d2";
  const U = random() > 0.05 ? 30 : 0;

  if (E) features.push("Rare ETH version");
  if (R === 0.76) features.push("Spread mode");
  else if (R === 1.52) features.push("Super Spread mode");
  features.push((N === "d1" ? "Day" : "Night") + " mode");
  if (M === false) {
    features.push("Monochrome mode");
  } else if (U === 0) features.push("Bi-colors mode");
  if (M === false && N === "d2") features.push("Night x Monochrome = Gold");
  const setup = function () {
    startRule = "start";
    transformScene = { s: R === 0.55 ? 2.2 : 2 };
    maxDepth = 100;
    minSize = 0.001;
    minComplexity = 500;
  };
  const rules = {
    start(s) {
      NC = 0;
      hue = randint(720);
      rule.WHOLE(s, {
        rx: randint(40) - 20,
        ry: randint(360),
      });
    },
    WHOLE(s) {
      FT++;
      rule.QUAD(s, { x: -R, y: -R, z: -R });
      rule.QUAD(s, { x: R, y: -R, z: -R });
      rule.QUAD(s, { x: -R, y: R, z: -R });
      rule.QUAD(s, { x: R, y: R, z: -R });
      rule.QUAD(s, { x: -R, y: -R, z: R, rz: 90 });
      rule.QUAD(s, { x: R, y: -R, z: R, rz: 90 });
      rule.QUAD(s, { x: -R, y: R, z: R, rz: 90 });
      rule.QUAD(s, { x: R, y: R, z: R, rz: 90 });
    },
    QUAD: [
      0.25,
      (s) => {
        rule.FRAME(s, { s: 1.1 });
      },
      0.1,
      (s) => {
        rule.COOLER(s, { s: 1 });
      },
      0.5,
      (s) => {
        rule.CUBE(s, { s: 1.1 });
      },
      0.25,
      (s) => {
        rule.WHOLE(s, { s: 0.5 });
      },
      0.5,
      (s) => {},
    ],
    COOLER(s) {
      if (SIZE(s) > 0.055) {
        NC++;
        CUBE(s, { s: [1.3, 0.4, 0.4] });
        for (let x = -1000; x < 1000; x += 20) {
          CUBE(s, { x: x, s: [20, 0.25, 0.25] });
        }
        for (let x = -0.5; x <= 0.5; x += 0.1) {
          CUBE(s, { x: x, s: [0.02, 1, 1] });
        }
      } else {
        rule.CUBE(s);
        nCubes++;
      }
    },
    CUBE(s) {
      if (random() > 0.75) {
        random();
      }
      CUBE(s, { s: 0.98 });
      nCubes++;
    },
    FRAME(s) {
      nFrames++;
      if (E === false) {
        CUBE(s, { s: 0.35 });
        nCubes++;
      } else {
        PYRAMID(s, { y: 0.23, s: 0.4 });
        PYRAMID(s, { rx: 180, y: 0.23, s: 0.4 });
      }
      rule.frame(s);
    },
    frame(s) {
      rule.sq(s, { z: -1 });
      rule.sq(s);
      rule.mem(s, { z: -1, rx: 90, y: 1 });
      rule.mem(s, { z: -1, rx: -90, y: -1 });
    },
    sq(s) {
      rule.mem(s);
      rule.mem(s, { rz: 90 });
    },
    mem(s) {
      CUBE(s, { s: [0.1, 1.1, 0.1], x: 5, z: 5 });
      CUBE(s, { s: [0.1, 1.1, 0.1], x: -5, z: 5 });
    },
  };
  structure(setup, rules);
  return features;
};

module.exports = { ignitionFeatures };

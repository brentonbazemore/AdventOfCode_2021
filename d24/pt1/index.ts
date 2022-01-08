const p1 = (w: number, z: number) => {
  let x = (z % 26) + 14;
  x = +(x !== w);

  z = z * ((25 * x) + 1);
  z = z + ((w + 8) * x);
  return z;
}

const p2 = (w: number, z: number) => {
  let x = (z % 26) + 13;
  x = +(x !== w);

  z = z * ((25 * x) + 1);
  z = z + ((w + 8) * x);

  return z;
}

const p3 = (w: number, z: number) => {
  let x = (z % 26) + 13;
  x = +(x !== w);

  z = z * ((25 * x) + 1);
  z = z + ((w + 3) * x);

  return z;
}

const p4 = (w: number, z: number) => {
  let x = (z % 26) + 12;
  x = +(x !== w);

  z = z * ((25 * x) + 1);
  z = z + ((w + 10) * x);

  return z;
}

const p5 = (w: number, z: number) => {
  let x = (z % 26) + -12;
  x = +(x !== w);
  z = parseInt(`${z / 26}`);

  z = z * ((25 * x) + 1);
  z = z + ((w + 8) * x);

  return z;
}

const p6 = (w: number, z: number) => {
  let x = (z % 26) + 12;
  x = +(x !== w);

  z = z * ((25 * x) + 1);

  z = z + ((w + 8) * x);
  return z;
}

const p7 = (w: number, z: number) => {
  let x = (z % 26) + -2;
  x = +(x !== w);
  z = parseInt(`${z / 26}`);
  
  z = z * ((25 * x) + 1);

  z = z + ((w + 8) * x);
  return z;
}

const p8 = (w: number, z: number) => {
  let x = (z % 26) + -11;
  x = +(x !== w);
  z = parseInt(`${z / 26}`);
  
  z = z * ((25 * x) + 1);

  z = z + ((w + 5) * x);
  return z;
}

const p9 = (w: number, z: number) => {
  let x = (z % 26) + 13;
  x = +(x !== w);

  z = z * ((25 * x) + 1);

  z = z + ((w + 9) * x);
  return z;
}

const p10 = (w: number, z: number) => {
  let x = (z % 26) + 14;
  x = +(x !== w);

  z = z * ((25 * x) + 1);

  z = z + ((w + 3) * x);
  return z;
}

const p11 = (w: number, z: number) => {
  let x = (z % 26) + 0;
  x = +(x !== w);
  z = parseInt(`${z / 26}`);

  z = z * ((25 * x) + 1);

  z = z + ((w + 4) * x);
  return z;
}

const p12 = (w: number, z: number) => {
  let x = (z % 26) + -12;
  x = +(x !== w);
  z = parseInt(`${z / 26}`);

  z = z * ((25 * x) + 1);

  z = z + ((w + 9) * x);
  return z;
}

const p13 = (w: number, z: number) => {
  let x = (z % 26) + -13;
  x = +(x !== w);
  z = parseInt(`${z / 26}`);

  z = z * ((25 * x) + 1);

  z = z + ((w + 2) * x);
  return z;
}

const p14 = (w: number, z: number) => {
  let x = (z % 26) + -6;
  x = +(x !== w);
  z = parseInt(`${z / 26}`);

  z = z * ((25 * x) + 1);

  z = z + ((w + 7) * x);
  return z;
}


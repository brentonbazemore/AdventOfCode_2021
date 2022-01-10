"use strict";
const pn = (w, z, offset, divisor, offset2) => {
    const x = (z % 26) + offset !== w;
    z = parseInt(`${z / divisor}`);
    // this always makes z bigger, so to make z smaller, x must be false (which means w is === z + offset)
    if (x) {
        z *= 26;
        z += w + offset2;
    }
    console.log(z);
    return z;
};
let n = [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9];
const findPair = (index1, index2, offset1, offset2) => {
    for (let i = 9; i > 0; i--) {
        n[index1] = i;
        for (let j = 9; j > 0; j--) {
            n[index2] = j;
            if (n[index1] + offset1 === n[index2] + offset2) {
                return;
            }
        }
    }
};
// n[4] + 12 === n[3] + 10;
// n[6] + 2 === n[5] + 8;
// n[7] + 11 === n[2] + 3;
// n[10] + 0 === n[9] + 3;
// n[11] + 12 === n[8] + 9;
// n[12] + 13 === n[1] + 8;
// n[13] + 6 === n[0] + 8;
findPair(4, 3, 12, 10);
findPair(6, 5, 2, 8);
findPair(7, 2, 11, 3);
findPair(10, 9, 0, 3);
findPair(11, 8, 12, 9);
findPair(12, 1, 13, 8);
findPair(13, 0, 6, 8);
console.log(n.join(''));
// sanity check
let out = pn(n.shift(), 0, 14, 1, 8);
out = pn(n.shift(), out, 13, 1, 8);
out = pn(n.shift(), out, 13, 1, 3);
out = pn(n.shift(), out, 12, 1, 10);
out = pn(n.shift(), out, -12, 26, 8);
out = pn(n.shift(), out, 12, 1, 8);
out = pn(n.shift(), out, -2, 26, 8);
out = pn(n.shift(), out, -11, 26, 5);
out = pn(n.shift(), out, 13, 1, 9);
out = pn(n.shift(), out, 14, 1, 3);
out = pn(n.shift(), out, 0, 26, 4);
out = pn(n.shift(), out, -12, 26, 9);
out = pn(n.shift(), out, -13, 26, 2);
out = pn(n.shift(), out, -6, 26, 7);
console.log(out);
const wrapSoVSCodeCanCollapse = () => {
    const p1 = (w, z) => {
        let x = (z % 26) + 14;
        x = +(x !== w);
        z = parseInt(`${z / 1}`);
        z = z * (25 * x + 1);
        z = z + (w + 8) * x;
        return z;
    };
    const p2 = (w, z) => {
        let x = (z % 26) + 13;
        x = +(x !== w);
        z = parseInt(`${z / 1}`);
        z = z * (25 * x + 1);
        z = z + (w + 8) * x;
        return z;
    };
    const p3 = (w, z) => {
        let x = (z % 26) + 13;
        x = +(x !== w);
        z = parseInt(`${z / 1}`);
        z = z * (25 * x + 1);
        z = z + (w + 3) * x;
        return z;
    };
    const p4 = (w, z) => {
        let x = (z % 26) + 12;
        x = +(x !== w);
        z = parseInt(`${z / 1}`);
        z = z * (25 * x + 1);
        z = z + (w + 10) * x;
        return z;
    };
    const p5 = (w, z) => {
        let x = (z % 26) + -12;
        x = +(x !== w);
        z = parseInt(`${z / 26}`);
        z = z * (25 * x + 1);
        z = z + (w + 8) * x;
        return z;
    };
    const p6 = (w, z) => {
        let x = (z % 26) + 12;
        x = +(x !== w);
        z = parseInt(`${z / 1}`);
        z = z * (25 * x + 1);
        z = z + (w + 8) * x;
        return z;
    };
    const p7 = (w, z) => {
        let x = (z % 26) + -2;
        x = +(x !== w);
        z = parseInt(`${z / 26}`);
        z = z * (25 * x + 1);
        z = z + (w + 8) * x;
        return z;
    };
    const p8 = (w, z) => {
        let x = (z % 26) + -11;
        x = +(x !== w);
        z = parseInt(`${z / 26}`);
        z = z * (25 * x + 1);
        z = z + (w + 5) * x;
        return z;
    };
    const p9 = (w, z) => {
        let x = (z % 26) + 13;
        x = +(x !== w);
        z = parseInt(`${z / 1}`);
        z = z * (25 * x + 1);
        z = z + (w + 9) * x;
        return z;
    };
    const p10 = (w, z) => {
        let x = (z % 26) + 14;
        x = +(x !== w);
        z = parseInt(`${z / 1}`);
        z = z * (25 * x + 1);
        z = z + (w + 3) * x;
        return z;
    };
    const p11 = (w, z) => {
        let x = (z % 26) + 0;
        x = +(x !== w);
        z = parseInt(`${z / 26}`);
        z = z * (25 * x + 1);
        z = z + (w + 4) * x;
        return z;
    };
    const p12 = (w, z) => {
        let x = (z % 26) + -12;
        x = +(x !== w);
        z = parseInt(`${z / 26}`);
        z = z * (25 * x + 1);
        z = z + (w + 9) * x;
        return z;
    };
    const p13 = (w, z) => {
        let x = (z % 26) + -13;
        x = +(x !== w);
        z = parseInt(`${z / 26}`);
        z = z * (25 * x + 1);
        z = z + (w + 2) * x;
        return z;
    };
    const p14 = (w, z) => {
        let x = (z % 26) + -6;
        x = +(x !== w);
        z = parseInt(`${z / 26}`);
        z = z * (25 * x + 1);
        z = z + (w + 7) * x;
        return z;
    };
};
//# sourceMappingURL=index.js.map
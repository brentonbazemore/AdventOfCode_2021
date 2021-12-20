"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const euclidean_distance_1 = __importDefault(require("euclidean-distance"));
const matrix_transformer_1 = __importDefault(require("matrix_transformer"));
// Toggle this to switch input files
const testInput = false;
// #################################
const rawData = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data = rawData.split('\n');
var Orientation;
(function (Orientation) {
    Orientation[Orientation["UP"] = 0] = "UP";
    Orientation[Orientation["DOWN"] = 1] = "DOWN";
    Orientation[Orientation["NORTH"] = 2] = "NORTH";
    Orientation[Orientation["EAST"] = 3] = "EAST";
    Orientation[Orientation["SOUTH"] = 4] = "SOUTH";
    Orientation[Orientation["WEST"] = 5] = "WEST";
})(Orientation || (Orientation = {}));
;
class Beacon {
    constructor(x, y, z) {
        this.neighbors = {};
        this.id = `${x}_${y}_${z}`;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
class Scanner {
    constructor(id) {
        this.beacons = [];
        this.id = id;
    }
    getBeaconsAsMatrix3D() {
        return this.beacons.map(beacon => ({ x: beacon.x, y: beacon.y, z: beacon.z }));
    }
    setBeaconsFromMatrix3D(matrix) {
        this.beacons = matrix.map(m => new Beacon(m.x, m.y, m.z));
    }
}
;
// Injest
let lastId = 0;
const scanners = [];
for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row.includes('scanner')) {
        lastId = +row.replace(/[^\d.]/g, '');
        scanners[lastId] = new Scanner(lastId);
    }
    else if (row != '') {
        const [x, y, z] = row.split(',').map(n => +n);
        scanners[lastId].beacons.push(new Beacon(x, y, (z || 0)));
    }
}
const calcDistances = (scanner) => {
    scanner.beacons.forEach(b1 => {
        scanner.beacons.forEach(b2 => {
            if (b1.x === b2.x && b1.y === b2.y && b1.z === b2.z) {
                return;
            }
            const distance = (0, euclidean_distance_1.default)([b1.x, b1.y, b1.z], [b2.x, b2.y, b2.z]);
            b1.neighbors[b2.id] = distance;
        });
    });
};
const compareScanners = (mainScanner, newScanner) => {
    calcDistances(mainScanner);
    calcDistances(newScanner);
    let candidates = new Set();
    mainScanner.beacons.forEach(mainBeacon => {
        // const matches = new Set<string>();
        const matches = {};
        const mainBeaconNeighbors = Object.keys(mainBeacon.neighbors);
        newScanner.beacons.forEach(newBeacon => {
            const newBeaconNeighbors = Object.keys(newBeacon.neighbors);
            mainBeaconNeighbors.forEach((neigh1) => {
                newBeaconNeighbors.forEach((neigh2) => {
                    if (mainBeacon.neighbors[neigh1] === newBeacon.neighbors[neigh2]) {
                        if (!matches[neigh2]) {
                            matches[neigh2] = [];
                        }
                        matches[neigh2].push(neigh1);
                    }
                });
            });
        });
        Object.keys(matches).forEach(newKey => {
            if (matches[newKey].length === 1) {
                candidates.add(`${matches[newKey][0]}=>${newKey}`);
            }
        });
    });
    return candidates;
};
const parseCandidateSet = (set) => {
    const oneMatrix = [];
    const twoMatrix = [];
    set.forEach((val) => {
        const [oneCoords, twoCoords] = val.split('=>');
        const [mx, my, mz] = oneCoords.split('_');
        const [nx, ny, nz] = twoCoords.split('_');
        oneMatrix.push({ x: +mx, y: +my, z: +mz });
        twoMatrix.push({ x: +nx, y: +ny, z: +nz });
    });
    return {
        one: oneMatrix,
        two: twoMatrix,
    };
};
const calculateCentroid = (matrix) => {
    let xSum = 0;
    let ySum = 0;
    let zSum = 0;
    matrix.forEach((point) => {
        xSum += point.x;
        ySum += point.y;
        zSum += point.z;
    });
    return {
        x: xSum / matrix.length,
        y: ySum / matrix.length,
        z: zSum / matrix.length,
    };
};
const center = (points, centroid) => {
    const centeredPoints = points.map((point) => {
        return new matrix_transformer_1.default(point).translateX(-centroid.x).translateY(-centroid.y).translateZ(-centroid.z).toObject();
    });
    return centeredPoints;
};
const rotateX = (points, rotation) => {
    return points.map(point => new matrix_transformer_1.default(point).rotateX(rotation).toObject());
};
const rotateY = (points, rotation) => {
    return points.map(point => new matrix_transformer_1.default(point).rotateY(rotation).toObject());
};
const rotateZ = (points, rotation) => {
    return points.map(point => new matrix_transformer_1.default(point).rotateZ(rotation).toObject());
};
const rotate = (points, rotations) => {
    let rotatedPoints = rotateX(points, rotations.x * 90);
    rotatedPoints = rotateY(rotatedPoints, rotations.y * 90);
    rotatedPoints = rotateZ(rotatedPoints, rotations.z * 90);
    return rotatedPoints;
};
const findRotation = (point1, point2) => {
    let xRot = 0;
    let yRot = 0;
    let zRot = 0;
    let found = false;
    top: for (let i = 0; i < 4; i++) {
        const x = new matrix_transformer_1.default(Object.assign({}, point2)).rotateX(i * 90);
        for (let j = 0; j < 4; j++) {
            const y = new matrix_transformer_1.default(Object.assign({}, x.toObject())).rotateY(j * 90);
            for (let k = 0; k < 4; k++) {
                const z = new matrix_transformer_1.default(Object.assign({}, y.toObject())).rotateZ(k * 90);
                if (point1.x.toFixed(9) === z.x.toFixed(9) && point1.y.toFixed(9) === z.y.toFixed(9) && point1.z.toFixed(9) === z.z.toFixed(9)) {
                    xRot = i;
                    yRot = j;
                    zRot = k;
                    found = true;
                    break top;
                }
            }
        }
    }
    return { x: xRot, y: yRot, z: zRot, found };
};
const translate = (matrix, translation) => {
    return matrix.map((m) => {
        return new matrix_transformer_1.default(m).translateX(translation.x).translateY(translation.y).translateZ(translation.z).toObject();
    });
};
const determineSign = (rotation) => {
    switch (rotation) {
        case 0:
            return 1;
        case 1:
        case 3:
            return 0;
        case 2:
            return -1;
        default:
            console.log('whoops');
            return 0;
    }
};
// const determineScannerLocation = (p1: Matrix3D, p2: Matrix3D, rots: Matrix3D): Matrix3D => {
//   const signs = {
//     x: determineSign(rots.x),
//     y: determineSign(rots.y),
//     z: determineSign(rots.z),
//   };
//   return {
//     x: p1.x + (signs.x * p2.x),
//     y: p1.y + (signs.y * p2.y),
//     z: p1.z + (signs.z * p2.z),
//   };
// }
// 1          sign   | <> 0  | c2 - c1 | origin
// centroid1 = - - - | < < < | + + +   | - - -
// centroid2 = + + + | > > >           | + + +
// - - -
// 0 + 528 - 460 = 68
// 0 + -643 - 603 = -1246
// 0 + 409 - 452 = -43
// 3          sign   | <> 0  | c2 - c1 | origin
// centroid1 = - - + | < < > | + + -   | - + +
// centroid2 = - + - | > > <           | - + -
// + - +
// 68 + -567 + 407 = -92
// -1246 + -361 - 773 = -2380
// -43 + -727 + 750 = -20
// 4          sign   | <> 0  | c2 - c1 | origin
// centroid1 = - + + | > > > | - - -   | - + +
// centroid2 = - + + | < < <           | - + +
// pair1     = + - + | < > > |
// rotPair2  = + - -
// graphed   = 
// - - -
// 68 + 340 -? 428 = -20
// -1246 + -569 - -682 = -1133
// -43 + 846 - -258 = 1061
// if  s1 -> b1 == + && s2 -> b2 == +
// then diff
// if s1 -> b1 == + && s2 -> b2 == -
// then sum
// if s1 -> b1 == - && s2 -> b2 == +
// then sum
// if s1 -> b1 == - && s2 -> b2 == -
// then diff
// if same, then diff
// if diff, then sum
const determineScannerLocation = (p1, p2) => {
    return {
        x: p1.x - p2.x,
        y: p1.y - p2.y,
        z: p1.z - p2.z,
    };
};
const findTotalRotation = (prevRot, thisRot) => {
    return { x: prevRot.x + thisRot.x, y: prevRot.y + thisRot.y, z: prevRot.z + thisRot.z };
};
const masterBeaconSet = new Set();
const masterScanner = scanners[0];
masterScanner.location = { x: 0, y: 0, z: 0 };
masterScanner.orientation = { x: 0, y: 0, z: 0 };
masterScanner.beacons.forEach((m) => {
    // masterBeaconSet.add(`${m.x}_${m.y}_${m.z}`);
});
const known = [masterScanner];
let unknown = [...scanners.slice(1)];
let sanity = 100;
while (unknown.length && sanity > 0) {
    sanity--;
    for (let i = 0; i < known.length; i++) {
        const scanner1 = known[i];
        for (let j = 0; j < unknown.length; j++) {
            const scanner2 = unknown[j];
            if (scanner2.id === 3) {
                const tr = '';
            }
            const candidates = compareScanners(scanner1, scanner2);
            if (candidates.size >= 12) {
                const pairs = parseCandidateSet(candidates);
                const centroid1 = calculateCentroid(pairs.one);
                const centroid2 = calculateCentroid(pairs.two);
                const centered1 = center(pairs.one, centroid1);
                const centered2 = center(pairs.two, centroid2);
                const rots = findRotation(centered1[0], centered2[0]);
                if (!rots.found) {
                    continue;
                }
                const rotPair2 = rotate(pairs.two, rots);
                const origin = scanner1.location;
                const trueX = origin.x + pairs.one[0].x - rotPair2[0].x;
                const trueY = origin.y + pairs.one[0].y - rotPair2[0].y;
                const trueZ = origin.z + pairs.one[0].z - rotPair2[0].z;
                // const relativeLoc = determineScannerLocation(pairs.one[0], rotPair2[0]);
                // const trueLocation = { x: origin.x + relativeLoc.x, y: origin.y + relativeLoc.y, z: origin.z + relativeLoc.z };
                scanner2.location = { x: trueX, y: trueY, z: trueZ };
                const newBeacons = rotate(scanner2.getBeaconsAsMatrix3D(), rots);
                scanner2.setBeaconsFromMatrix3D(newBeacons);
                // console.log(pairs.one[0], rotPair2[0]);
                // const loc = determineScannerLocation(pairs.one[0], pairs.two[0], totalRots);
                // const trueLoc = { x: scanner1.location!.x + loc.x, y: scanner1.location!.y + loc.y, z: scanner1.location!.z + loc.z };
                // const rotated2 = rotate(scanner2.getBeaconsAsMatrix3D(), totalRots);
                // rotated2.forEach((m) => {
                //   masterBeaconSet.add(`${trueLoc.x + m.x}_${trueLoc.y + m.y}_${trueLoc.z + m.z}`);
                // });
                // scanner2.location = trueLoc;
                // scanner2.orientation = totalRots;
            }
        }
    }
    unknown = unknown.filter(scanner => {
        if (scanner.location) {
            known.push(scanner);
            return false;
        }
        else {
            return true;
        }
    });
}
const origins = {};
known.forEach((scanner) => {
    origins[scanner.id] = scanner;
});
const combos = [];
for (let i = 0; i < known.length; i++) {
    for (let j = i; j < known.length; j++) {
        combos.push([i, j]);
    }
}
const findManhattan = (coords1, coords2) => {
    return Math.abs(coords1.x - coords2.x) + Math.abs(coords1.y - coords2.y) + Math.abs(coords1.z - coords2.z);
};
let maxDistance = -Infinity;
combos.forEach(([id1, id2]) => {
    maxDistance = Math.max(maxDistance, findManhattan(origins[id1].location, origins[id2].location));
});
console.log(maxDistance);
// const scannerQueue = [...scanners];
// const masterScanner = scannerQueue.shift()!;
// masterScanner.location = { x: 0, y: 0, z: 0 };
// masterScanner.orientation = { x: 0, y: 0, z: 0 };
// masterScanner.beacons.forEach((m) => {
//   masterBeaconSet.add(`${m.x}_${m.y}_${m.z}`);
// });
// while (scannerQueue.length) {
//   const nextScanner = scannerQueue.shift()!;
//   const candidates = compareScanners(masterScanner, nextScanner);
//   if (candidates.size >= 12) {
//     const pairs = parseCandidateSet(candidates);
//     const masterCentroid = calculateCentroid(pairs.main);
//     const nextCentroid = calculateCentroid(pairs.new);
//     const centeredMain = center(pairs.main, masterCentroid);
//     const centeredNew = center(pairs.new, nextCentroid);
//     const rots = findRotation(centeredMain[0], centeredNew[0]);
//     nextScanner.orientation = rots;
//     const loc = determineScannerLocation(pairs.main[0], pairs.new[0], nextScanner.orientation);
//     // findTotalRot and use that next here
//     const rotatedNew = rotate(nextScanner.getBeaconsAsMatrix3D(), rots);
//     rotatedNew.forEach((m) => {
//       masterBeaconSet.add(`${loc.x + m.x}_${loc.y + m.y}_${loc.z + m.z}`);
//     });
//     console.log(masterBeaconSet.size);
//     // const fullMainCentered = center(masterScanner.getBeaconsAsMatrix3D(), masterCentroid);
//     // let fullNextCentered = center(nextScanner.getBeaconsAsMatrix3D(), nextCentroid);
//     // fullNextCentered = rotateX(fullNextCentered, rots.xRot);
//     // fullNextCentered = rotateY(fullNextCentered, rots.yRot);
//     // fullNextCentered = rotateZ(fullNextCentered, rots.zRot);
//     // const uniq: { [key: string]: Matrix3D } = {};
//     // fullMainCentered.forEach((m) => {
//     //   uniq[`${m.x}_${m.y}_${m.z}`] = m;
//     // });
//     // fullNextCentered.forEach((m) => {
//     //   uniq[`${m.x}_${m.y}_${m.z}`] = m;
//     // });
//     // masterScanner.setBeaconsFromMatrix3D(Object.values(uniq));
//   } else {
//     console.log('didnt find one with 12');
//     scannerQueue.push(nextScanner);
//   }
// }
// console.log(masterScanner.beacons.length);
// for (let i = 1; i < scanners.length; i++) {
//   const cur = scanners[i];
//   const candidates = compareScanners(masterScanner, cur);
//   if (candidates.size >= 12) {
//     const pairs = parseCandidateSet(candidates);
//     const mainCentroid = calculateCentroid(pairs.main);
//     const newCentroid = calculateCentroid(pairs.new);
//     const centeredMain = center(pairs.main, mainCentroid);
//     const centeredNew = center(pairs.new, newCentroid);
//     console.log(mainCentroid, newCentroid);
//     const rots = findRotation(centeredMain[0], centeredNew[0]);
//     const fullMainCentered = center(masterScanner.getBeaconsAsMatrix3D(), mainCentroid);
//     let fullNewCentered = center(cur.getBeaconsAsMatrix3D(), newCentroid);
//     fullNewCentered = rotateX(fullNewCentered, rots.xRot);
//     fullNewCentered = rotateY(fullNewCentered, rots.yRot);
//     fullNewCentered = rotateZ(fullNewCentered, rots.zRot);
//     const uniq: { [key: string]: Matrix3D } = {};
//     fullMainCentered.forEach((m) => {
//       uniq[`${m.x}_${m.y}_${m.z}`] = m;
//     });
//     fullNewCentered.forEach((m) => {
//       uniq[`${m.x}_${m.y}_${m.z}`] = m;
//     });
//     // rotate(cur.getBeaconsAsMatrix3D())
//     // const xRot = rotateX(centeredNew, rots.xRot * 90);
//     // const yRot = rotateY(xRot, rots.yRot * 90);
//     // const zRot = rotateZ(yRot, rots.zRot * 90);
//     // console.log(rots);
//     // console.log(centeredMain, centeredNew);
//     // console.log(pairs.main)
//     // console.log(zRot);
//     // const mainAngle = findAngle(centeredMain[0]);
//     // const newAngle = findAngle(centeredNew[0]);
//     // console.log(rad2deg(mainAngle.phi));
//     // console.log(rad2deg(newAngle.phi));
//     // console.log(rad2deg(temp.phi));
//     // console.log(rad2deg(temp.theta));
//     // console.log(rad2deg(mainAngle.theta));
//     // console.log(rotateY(rotated, 180));
//     // console.log((mainAngle.theta - newAngle.theta));
//     // console.log((mainAngle.phi - newAngle.phi));
//     // console.log(find_angle({x: 0, y: 0, z: 0}, centeredMain[0], centeredNew[0]));
//     // console.log(centeredMain, rotated);
//   } else {
//     console.log('didnt find one with 12');
//   }
// }
///////// Method 1
// start with 0
// plot all of the beacons with respect to 0,0
// cast to 2d shape (on x, and y, and z);
// next to 1
// plot all of the beacons with respect to new 0,0
// rotate in all 6 directions
// cast to 2d
// shift the grid around to see if there are any overlaps
// if overlap is 12, then that is the x,y position
// shift in z to find 3rd coord
// next to 2
// continue;
///////// Method 2
// start with 0
// plot all points with respect to 0,0
// calculate each nodes distance from it's neighbors
// next to 1
// plot all points with repect to 0,0
// calculate each nodes distance from it's neighbors
// compare 0 to 1, select all of the nodes that have 12 or more identical distances
// orient scanner 0 to 1 based on matched beacons
// add to master map
// next to 2
// repeat
//# sourceMappingURL=index.js.map
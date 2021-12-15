"use strict";
// // ts-nocheck
// // https://github.com/andrewhayward/dijkstra
// export var Graph = (function (undefined) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dijkstra = exports.Vertex = void 0;
class Vertex {
    constructor(theName, theNodes, theWeight) {
        this.name = theName;
        this.nodes = theNodes;
        this.weight = theWeight;
    }
}
exports.Vertex = Vertex;
class Dijkstra {
    constructor() {
        this.vertices = {};
    }
    addVertex(vertex) {
        this.vertices[vertex.name] = vertex;
    }
    findPointsOfShortestWay(start, finish, weight) {
        let nextVertex = finish;
        let arrayWithVertex = [];
        while (nextVertex !== start) {
            let minWeigth = Number.MAX_VALUE;
            let minVertex = "";
            for (let i of this.vertices[nextVertex].nodes) {
                if (i.weight + this.vertices[i.nameOfVertex].weight < minWeigth) {
                    minWeigth = this.vertices[i.nameOfVertex].weight;
                    minVertex = i.nameOfVertex;
                }
            }
            arrayWithVertex.push(minVertex);
            nextVertex = minVertex;
        }
        return arrayWithVertex;
    }
    findShortestWay(start, finish) {
        let nodes = {};
        let visitedVertex = [];
        for (let i in this.vertices) {
            if (this.vertices[i].name === start) {
                this.vertices[i].weight = 0;
            }
            else {
                this.vertices[i].weight = Number.MAX_VALUE;
            }
            nodes[this.vertices[i].name] = this.vertices[i].weight;
        }
        while (Object.keys(nodes).length !== 0) {
            let sortedVisitedByWeight = Object.keys(nodes).sort((a, b) => this.vertices[a].weight - this.vertices[b].weight);
            let currentVertex = this.vertices[sortedVisitedByWeight[0]];
            for (let j of currentVertex.nodes) {
                const calculateWeight = currentVertex.weight + j.weight;
                if (calculateWeight < this.vertices[j.nameOfVertex].weight) {
                    this.vertices[j.nameOfVertex].weight = calculateWeight;
                }
            }
            delete nodes[sortedVisitedByWeight[0]];
        }
        const finishWeight = this.vertices[finish].weight;
        let arrayWithVertex = this.findPointsOfShortestWay(start, finish, finishWeight).reverse();
        arrayWithVertex.push(finish, finishWeight.toString());
        return arrayWithVertex;
    }
}
exports.Dijkstra = Dijkstra;
//# sourceMappingURL=dijkstras.js.map
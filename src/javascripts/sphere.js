export class Sphere {
    constructor(r = .9, nPoints = 36) {
        this.vertices = []
        for (let i = 0; i < nPoints; i++) {
            let theta = i * 2 * Math.PI / nPoints

            for (let j = 0; j <= nPoints; j++) {
                let phi = j * 2 * Math.PI / nPoints

                this.vertices.push(
                    r * Math.cos(phi) * Math.sin(theta), // X
                    r * Math.cos(theta), // Y
                    r * Math.sin(phi) * Math.sin(theta) // Z
                )
            }
        }
    }
}
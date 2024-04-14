class Automata {
    constructor() {
        this.plants = new Array(PARAMETERS.dimension).fill(null).map(() => new Array(PARAMETERS.dimension).fill(null));
    }

    clearPlants() {
        this.plants = new Array(PARAMETERS.dimension).fill(null).map(() => new Array(PARAMETERS.dimension).fill(null));
    }

    addPlant() {
        let x =  Math.floor(Math.random() * PARAMETERS.dimension);
        let z =  Math.floor(Math.random() * PARAMETERS.dimension);
        
        this.plants[x][z] = new Plant({ hue: randomInt(100), x: 0, y: 0 }, this);
    }

    update() {
        for (let i = 0; i < PARAMETERS.dimension; i++) {
            for (let j = 0; j < PARAMETERS.dimension; j++) {
                if (this.plants[i][j]) {
                    this.plants[i][j].update();
                }
                if (Math.random() < 0.01) this.plants[i][j] = null;
            }
        }
    }

    draw(ctx) {
        for (let i = 0; i < PARAMETERS.dimension; i++) {
            for (let j = 0; j < PARAMETERS.dimension; j++) {
                if (this.plants[i][j]) {
                    this.plants[i][j].draw(ctx);
                }
            }
        }
    }
}

class Animat {
	constructor(other, automata) {
		this.automata = automata;
		this.hue = other.hue;
		
		this.x = other.x;
		this.y = other.y;

		this.energy = 70;
	}	
	moveAndEat() {
		let x = this.x;
		let y = this.y;
		
		let closestColor = 360; // Initialize the closest color to a high value
		
		// Loop through neighboring cells to find the closest one
		for(let i = -1; i <= 1; i++) {
			const newX = (this.x + i + PARAMETERS.dimension) % PARAMETERS.dimension;
			for(let j = -1; j <= 1; j++) {
				const newY = (this.y + j + PARAMETERS.dimension) % PARAMETERS.dimension;
				
				// Calculate the color difference between the Animat and the plant
				const plant = this.automata.plants[newX][newY];
				const newColor = plant ? Math.abs(this.hue - plant.hue) : 360;
		
				// Update closest color and position if the current cell has a closer color
				if(newColor < closestColor) {
					closestColor = newColor;
					x = newX;
					y = newY;
				}
			}
		}
		
		// Update Animat's position
		this.x = x;
		this.y = y;
		
		// Get growth rate from input field
		let growthRate = parseInt(document.getElementById("animatgrowth").value);
		
		// Get the plant in the current cell
		let plant = this.automata.plants[this.x][this.y];
		
		// Calculate the difference in hue between Animat and plant
		let hueDiff = plant ? this.hueDifference(plant) : 0;
		
		// Check if the Animat can consume the plant
		if (plant != null && hueDiff >= 0.5) {
			this.automata.plants[this.x][this.y] = null; // Remove the plant from the cell
			this.energy += 30 / growthRate * hueDiff; // Gain energy from consuming the plant
		}
	}

	hueDifference (plant) {
		let diff = plant ? Math.abs(this.hue - plant.hue) : 180;
		diff = Math.min(diff, 360 - diff); 
		
		return 1 - (diff / 180);
		
	}


	update() {
		this.moveAndEat();
		if(this.energy > 75) {
			this.energy -= 75;
			const mutationChance = 0.1;
			gameEngine.addEntity(new Animat({mutationChance:0.1, hue: Math.random() < mutationChance ?  randomInt(30) : this.hue, x: Math.random() < mutationChance ? randomInt(30) : this.x, y: Math.random() < mutationChance ? randomInt(30) : this.y}, this.automata));
		}		
		if(this.energy < 1 || Math.random() < 0.01) 	{
			this.removeFromWorld = true;
		}
	}

	draw(ctx) {
		ctx.fillStyle = hsl(this.hue,75,50);
		ctx.strokeStyle = "light gray";
		ctx.beginPath();
		ctx.arc((this.x + 1/2)*PARAMETERS.size, (this.y + 1/2)*PARAMETERS.size, PARAMETERS.size/2 - 1, 0, 2*Math.PI);
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = "black"; 
		ctx.beginPath();
		ctx.arc(this.x * PARAMETERS.size + PARAMETERS.size / 3, this.y * PARAMETERS.size + PARAMETERS.size / 3, PARAMETERS.size / 5, 0, Math.PI * 2);
		ctx.arc(this.x * PARAMETERS.size + 2 * PARAMETERS.size / 3, this.y * PARAMETERS.size + PARAMETERS.size / 3, PARAMETERS.size / 5, 0, Math.PI * 2);
		ctx.fill();
	}
};
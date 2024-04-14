class Plant {
	constructor(other, automata) {
		this.automata = automata;
		this.hue = other.hue;
		
		this.x = other.x;
		this.y = other.y;

		this.growth = 0;
	}	
	update() {
		const growthrate = parseInt(document.getElementById("plantgrowth").value);

		if(this.growth < 30 ) this.growth += 30/growthrate;
		if(this.growth >= 30){
			
			const other = {
				x: Math.floor(Math.random() * PARAMETERS.dimension),
				y: Math.floor(Math.random() * PARAMETERS.dimension),
				hue: (this.hue - (50 + randomInt(5)) + 360) % 360
			};			
			
			if(!this.automata.plants[other.x][other.y]) {
				this.automata.plants[other.x][other.y] = new Plant (other, this.automata)
				this.growth -= 30;
			} 
		}
	}

	draw(ctx) {
	
	
		ctx.fillStyle = hsl(this.hue, 40 + this.growth, 45);
		ctx.fillRect(this.x * PARAMETERS.size, this.y * PARAMETERS.size, PARAMETERS.size, PARAMETERS.size);
		ctx.strokeRect(this.x * PARAMETERS.size, this.y * PARAMETERS.size, PARAMETERS.size, PARAMETERS.size);

		//add a cool eyes into cell
		ctx.fillStyle = "black"; 
		ctx.beginPath();
		ctx.arc(this.x * PARAMETERS.size + PARAMETERS.size / 3, this.y * PARAMETERS.size + PARAMETERS.size / 3, PARAMETERS.size / 5, 0, Math.PI * 2);
		ctx.arc(this.x * PARAMETERS.size + 2 * PARAMETERS.size / 3, this.y * PARAMETERS.size + PARAMETERS.size / 3, PARAMETERS.size / 5, 0, Math.PI * 2);
		ctx.fill();
	

	}
};

class Unit_Enemy extends Unit {

	constructor(pos, size, tileInfo, hitPoints) {

		super(pos, size, tileInfo);

		this.weapon = rand() > 0.5 ? 'axe' : 'sword';

		this.speed = 1 / 96;

		if (hitPoints) {
			this.hitPoints = hitPoints;
			this.maxHitPoints = hitPoints;
		}
	}

	isOver(x, y) {

		return x > this.pos.x - this.size.x / 2 && x < this.pos.x + this.size.x / 2 && y > this.pos.y - this.size.y / 2 && y < this.pos.y + this.size.y / 2;

	}


	update() {

		if (this.actionTimer.isSet()) {
			// performing action

			if (this.actionTimer.elapsed()) {
				this.actionTimer.unset();
				this.jumpHeight = 0;

				// attack
				zzfx(...[, .03, 405, , , 0, 3, .1, 8, , , , , .1, 27, .4, .04, .44, .01]); 
				
				this.intentionTarget.takeDamage(1);

			}
			else {
				const percent = this.actionTimer.getPercent();
				if (percent > 0.9) {
					this.actionFrame -= 10;
					this.jumpHeight += percent > 0.95 ? -1 / 32 : 1 / 32;
				}
				else {
					this.actionFrame++;
				}
			}
		}

		else if (this.destination && (this.destination.x != this.pos.x || this.destination.y != this.pos.y)) {
			
			const angle = this.destination.subtract(this.pos).angle();
			const dist = this.destination.distance(this.pos);

			if (dist < this.speed) {
				// arrived

				// attack town hall
				this.destination = DEFS.HOME;
			}
			else {

				// look for targets
				let closest = Infinity;
				for (let i = 0; i < GLOBAL.units.length; i++) {
					const unit = GLOBAL.units[i];
					const dist = this.pos.distance(unit.pos);
					if (dist < 0.8 && !unit.shelter) {
						this.actionTimer.set(1);
						this.actionFrame = 0;
						this.intentionTarget = unit;
						return;
					}
					else if (dist < 3 && dist < closest) {
						this.destination = unit.pos;
						closest = dist;
					}
				}

				// travelling
				const movement = vec2().setAngle(angle, this.speed);
				const newPos = this.pos.add(movement);
				const tileAtPos = GLOBAL.mapMan.getTileAt(newPos);

				if (tileAtPos) {
					// collision
					if (tileAtPos instanceof Building) {
						
						this.actionTimer.set(1);
						this.actionFrame = 0;
						this.intentionTarget = tileAtPos;
					}
					else {
						// TODO: go around?

						// walk thru for now at half speed
						this.pos = this.pos.add(vec2().setAngle(angle, this.speed / 4));
						this.mirror = movement.x < 0;
						this.walkFrame++;

						this.renderOrder = -this.pos.y;
					}
				}
				else {
					// walk towards destination
					this.pos = newPos;
					this.mirror = movement.x < 0;
					this.walkFrame++;

					this.renderOrder = -this.pos.y;
				}
			}

		}
		else {
			this.walkFrame = 0;
		}

	}
		
	render() {

		// pre render

		// render
		super.render();

		// post render

		this.drawTool(this.weapon == 'axe' ? vec2(24) : vec2(72, 48));

	}
}
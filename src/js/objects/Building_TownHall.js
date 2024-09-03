
class Building_TownHall extends Building {

	constructor(pos) {

		super(pos, vec2(2), tile(vec2(0, 24), 24));

		this.popSupport = 3;
		this.hitPoints = 18;
		this.maxHitPoints = 18;

		this.build(10);
	}

	handleClick(selectedUnits) {

		if (!selectedUnits.length) {
			GLOBAL.state = DEFS.STATES.TOWNHALL_MENU;
		}

		for (let u = 0; u < selectedUnits.length; u++) {
			selectedUnits[u].takeOrder('store', this);
		}

		return true;
	}
	

	destroy() {
		// end game
		GLOBAL.state = DEFS.STATES.GAME_LOST;

		super.destroy();
	}

	update() {
		if (Math.random() < 0.05) {
			GLOBAL.vfxMan.addParticles(this.pos.subtract(vec2(0.3, -0.8)), GLOBAL.vfxMan.smoke, 1);
		}
	}

}
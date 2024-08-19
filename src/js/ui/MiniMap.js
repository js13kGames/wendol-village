
GLOBAL.miniMap = {

	isOver(x, y) {

		const uiPos = screenToWorld(vec2(innerWidth - 128, innerHeight - 128));

		const dx = x - (uiPos.x - 15 / 12);
		const dy = y - (uiPos.y - 15 / 12);

		if (dx > 0 && dx <= 30 / 12 && dy > 0 && dy <= 30 / 12) {
			cameraPos = vec2(dx * 12, dy * 12)			
		}
	},

	draw() {
		const uiPos = screenToWorld(vec2(innerWidth - 128, innerHeight - 128));

		drawRect(
			uiPos,
			vec2(32 / 12),
			new Color(0, 0, 0)
		);

		drawRect(
			uiPos,
			vec2(30 / 12),
			new Color(55/255, 148/255, 110/255)
		);
		for (let y = 0; y < GLOBAL.mapMan.mapHeight; y++) {
			for (let x = 0; x < GLOBAL.mapMan.mapWidth; x++) {
				const val = GLOBAL.mapGrid[y][x];
				if (val) {
					let color = new Color(75 / 255, 105 / 255, 47 / 255); // tree
					let size = vec2(1 / 12);
					if (val instanceof Stone) {
						color = new Color(155 / 255, 173 / 255, 183 / 255)
					}

					drawRect(
						uiPos.add(vec2((x - 15) / 12, (y - 15) / 12)),
						size,
						color
					);
				}
			}
		}
		let color = new Color(153 / 255, 229 / 255, 80 / 255);
		for (let i = 0; i < GLOBAL.buildings.length; i++) {
			const building = GLOBAL.buildings[i];
			drawRect(
				uiPos.add(vec2((building.pos.x - 15) / 12, (building.pos.y - 15) / 12)),
				building instanceof Building_TownHall ? vec2(2/12) : vec2(1/12),
				color
			);
		}
		for (let i = 0; i < GLOBAL.units.length; i++) {
			const unit = GLOBAL.units[i];
			drawRect(
				uiPos.add(vec2((unit.pos.x - 15) / 12, (unit.pos.y - 15) / 12)),
				vec2(1/12),
				color
			);
		}

		color = new Color(217 / 255, 87 / 255, 99 / 255);
		for (let i = 0; i < GLOBAL.enemies.length; i++) {
			const enemy = GLOBAL.enemies[i];
			drawRect(
				uiPos.add(vec2((enemy.pos.x - 15) / 12, (enemy.pos.y - 15) / 12)),
				vec2(1/12),
				color
			);
		}

	}
}
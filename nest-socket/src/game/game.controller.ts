import { Controller, Get, Render } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
    constructor(private readonly GameService: GameService) {}

	@Get()
  	@Render('game/game.hbs')
 	socketIoHome() {
    	return this.GameService.socketIoHome();
 	}
}

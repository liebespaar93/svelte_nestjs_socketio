import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketIoModule } from './socket-io/socket-io.module';
import { GameModule } from './game/game.module';


@Module({
  imports: [SocketIoModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';

@Injectable()
export class GameService {
	socketIoHome() {
        return ( { data : "data" });
    }
}

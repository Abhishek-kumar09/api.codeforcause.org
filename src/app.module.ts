import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import {
  KeycloakModule,
} from './keycloak/keycloak.module';

@Module({
  imports: [
    ConfigModule,
    KeycloakModule.register(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})

export class AppModule {}



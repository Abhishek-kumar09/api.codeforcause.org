import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  KeycloakModule,
} from './keycloak/keycloak.module';


@Module({
  imports: [
    KeycloakModule.register({
      authServerUrl: 'https://authbox.codeforcause.org/auth/',
      realm: 'development',
      clientId: 'dev-server',
      secret: '982830cc-6230-457b-869c-51045b956f8c'
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})

export class AppModule {}



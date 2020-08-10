import { DynamicModule, Module, Provider } from '@nestjs/common';
import * as Keycloak from 'keycloak-connect';
import { KEYCLOAK_CONNECT_OPTIONS, KEYCLOAK_INSTANCE } from './constants';
import { KeycloakConnectOptions } from './interface/keycloak-connect-options.interface';
import { ConfigModule, ConfigService } from 'src/config';

export * from './decorators/resource.decorator';
export * from './decorators/scopes.decorator';
export * from './guards/auth.guard';
export * from './guards/resource.guard';
export * from './constants';

@Module({})
export class KeycloakModule {
  public static register(): DynamicModule {

    return {
      module: KeycloakModule,
      imports: [
        ConfigModule
      ],
      providers: [
        this.keycloakProvider,
      ],
      exports: [this.keycloakProvider],
    };
  }

  private static keycloakProvider: Provider = {
    provide: KEYCLOAK_INSTANCE,
    useFactory: (config : ConfigService) => {
      const keycloakOpts: any = {
        authServerUrl: config.get('KEYCLOAK_SERVER_URL'),
        realm: config.get('KEYCLOAK_REALM'),
        clientId: config.get('KEYCLOAK_CLIENT'),
        secret: config.get('KEKCLOAK_SECRET'),
      }

      const keycloak: any = new Keycloak({}, keycloakOpts);

      // Access denied is called, add a flag to request so our resource guard knows
      keycloak.accessDenied = (req: any, res: any, next: any) => {
        req.resourceDenied = true;
        next();
      };
      return keycloak;
    },
    inject: [ConfigService],

  };
}

import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config/environment-config.service';
import { ExceptionsModule } from '@infrastructure/exceptions/exceptions.module';

@Module({
  imports: [
    Jwt.registerAsync({
      useFactory: async (config: EnvironmentConfigService) => {
        return {
          secret: config.getJwtSecret(),
          signOptions: { expiresIn: config.getJwtExpirationTime() },
        };
      },
      inject: [EnvironmentConfigService],
    }),
    ExceptionsModule,
  ],
  providers: [JwtTokenService],
  exports: [JwtTokenService],
})
export class JwtServiceModule {}

import { Module } from '@nestjs/common';
import { PontoController } from './ponto.controller';
import { PontoModel } from 'src/infrastructure/models/ponto.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsecaseProxyModule } from 'src/infrastructure/use-case-proxy/usecase-proxy.module';
@Module({
  imports: [
    SequelizeModule.forFeature([PontoModel]),
    UsecaseProxyModule.register(),
  ],
  controllers: [PontoController],
})
export class PontoModule {}

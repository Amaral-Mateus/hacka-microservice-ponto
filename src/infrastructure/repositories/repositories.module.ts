import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PontoModel } from '../models/ponto.model';
import { PontoRepositorySequelize } from './ponto.repository.impl.sequelize';
import { PubSubService } from '../services/pub-sub.service';

@Module({
  imports: [SequelizeModule.forFeature([PontoModel])],
  providers: [PontoRepositorySequelize, PubSubService],
  exports: [PontoRepositorySequelize, PubSubService],
})
export class RepositoriesModule {}

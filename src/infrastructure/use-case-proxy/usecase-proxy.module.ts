import { DynamicModule, Module } from '@nestjs/common';
import { PontoRepositorySequelize } from '../repositories/ponto.repository.impl.sequelize';
import { UseCaseProxy } from './usecase-proxy';
import { RegisterUseCase } from 'src/application/use-cases/register.use-case';
import { GetAllUseCase } from 'src/application/use-cases/get-all.use-case copy';
import { GetByUserUseCase } from 'src/application/use-cases/get-by-user.use-case';
import { RepositoriesModule } from '../repositories/repositories.module';
@Module({
  imports: [RepositoriesModule],
})
export class UsecaseProxyModule {
  //Ponto
  static REGISTER_PONTO_USE_CASE = 'registerPontoUsecaseProxy';
  static GET_ALL_PONTO_USE_CASE = 'getAllPontoUsecaseProxy';
  static GET_BY_USER_PONTO_USE_CASE = 'getByUserPontoUsecaseProxy';


  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [PontoRepositorySequelize],
          provide: UsecaseProxyModule.REGISTER_PONTO_USE_CASE,
          useFactory: (userRepository: PontoRepositorySequelize) =>
            new UseCaseProxy(new RegisterUseCase(userRepository)),
        },
        {
          inject: [PontoRepositorySequelize],
          provide: UsecaseProxyModule.GET_ALL_PONTO_USE_CASE,
          useFactory: (userRepository: PontoRepositorySequelize) =>
            new UseCaseProxy(new GetAllUseCase(userRepository)),
        },
        {
            inject: [PontoRepositorySequelize],
            provide: UsecaseProxyModule.GET_BY_USER_PONTO_USE_CASE,
            useFactory: (userRepository: PontoRepositorySequelize) =>
              new UseCaseProxy(new GetByUserUseCase(userRepository)),
        },
      ],
      exports: [
        UsecaseProxyModule.REGISTER_PONTO_USE_CASE,
        UsecaseProxyModule.GET_ALL_PONTO_USE_CASE,
        UsecaseProxyModule.GET_BY_USER_PONTO_USE_CASE,
      ],
    };
  }
}

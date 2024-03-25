import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { RegisterPontoDto } from './dto/register-ponto.dto';
import { RegisterUseCase } from 'src/application/use-cases/register.use-case';
import { GetAllUseCase } from 'src/application/use-cases/get-all.use-case copy';
import { GetByUserUseCase } from 'src/application/use-cases/get-by-user.use-case';
import { UsecaseProxyModule } from 'src/infrastructure/use-case-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/use-case-proxy/usecase-proxy';

@Controller('ponto')
export class PontoController {
  constructor(
    @Inject(UsecaseProxyModule.REGISTER_PONTO_USE_CASE)
    private readonly registerPontoUseCase: UseCaseProxy<RegisterUseCase>,
    @Inject(UsecaseProxyModule.GET_ALL_PONTO_USE_CASE)
    private readonly getAllPontoUseCase: UseCaseProxy<GetAllUseCase>,
    @Inject(UsecaseProxyModule.GET_BY_USER_PONTO_USE_CASE)
    private readonly getByIdUseCaseProxy: UseCaseProxy<GetByUserUseCase>,
  ) {}

  @Post()
  async register(@Body() ponto: RegisterPontoDto) {
    return this.registerPontoUseCase.getInstance().execute(ponto);
  }

  @Get()
  async getAll() {
    return this.getAllPontoUseCase.getInstance().execute();
  }

  @Get('/:userId')
  findByType(@Param('userId') userId: string) {
    return this.getByIdUseCaseProxy.getInstance().execute(userId);
  }
}

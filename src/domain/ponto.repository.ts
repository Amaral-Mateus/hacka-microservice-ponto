import { RegisterPontoDto } from 'src/presentations/dto/register-ponto.dto';
export interface IPontoRepository {
  register(registerPontoDto: RegisterPontoDto): Promise<any>;
  getAll(): Promise<any>;
  getByUser(user: string): Promise<any>;
}

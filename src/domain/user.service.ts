import { RegisterPontoDto } from 'src/presentations/dto/register-ponto.dto';
export interface IPontoService {
  register(registerPontoDto: RegisterPontoDto): Promise<any>;
  getAll(): Promise<any>;
  getByUser(user: string): Promise<any>;
}

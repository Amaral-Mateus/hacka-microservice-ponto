import { IPontoRepository } from 'src/domain/ponto.repository';
import { Ponto } from 'src/domain/ponto.entity';
import { RegisterPontoDto } from 'src/presentations/dto/register-ponto.dto';

export class RegisterUseCase {
  constructor(private readonly pontoRepository: IPontoRepository) {}

  async execute(data: RegisterPontoDto): Promise<any> {
    const ponto = new Ponto(data.userId, data.timeStamp);
    
    return await this.pontoRepository.register(ponto);
  }
}
import { IPontoRepository } from 'src/domain/ponto.repository';

export class GetByUserUseCase {
  constructor(private readonly pontoRepository: IPontoRepository) {}

  async execute(userId: string): Promise<any> {
    return await this.pontoRepository.getByUser(userId);
  }
}
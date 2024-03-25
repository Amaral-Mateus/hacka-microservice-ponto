import { IPontoRepository } from 'src/domain/ponto.repository';

export class GetAllUseCase {
  constructor(private readonly pontoRepository: IPontoRepository) {}

  async execute(): Promise<any> {
    return await this.pontoRepository.getAll();
  }
}
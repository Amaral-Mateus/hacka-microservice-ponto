import { PontoModel } from '../models/ponto.model';
import { IPontoRepository } from 'src/domain/ponto.repository';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterPontoDto } from 'src/presentations/dto/register-ponto.dto';
import { PubSubService } from '../services/pub-sub.service';

@Injectable()
export class PontoRepositorySequelize implements IPontoRepository {
  constructor(
    @InjectModel(PontoModel)
    private pontoModel: typeof PontoModel,
    private readonly pubSubService: PubSubService,
  ) {
    this.subscribeToRelatorioEvents();
  }

  async register(ponto: RegisterPontoDto): Promise<any> {
    const newPonto = await this.pontoModel.create(ponto);
    return newPonto;
  }

  async getAll(): Promise<any> {
    return await this.pontoModel.findAll();
  }

  async getByUser(userId: string): Promise<any> {
    return await this.pontoModel.findAll({ where: { userId: userId } });
  }

  private decodeBase64(base64String: string): string {
    // Decodificar a string base64 de volta ao valor original
    return Buffer.from(base64String, 'base64').toString();
  }

  private async subscribeToRelatorioEvents() {
    try {
      await this.pubSubService.subscribe(
        'projects/hackathon-fiap-ponto/topics/relatorio_ready-sub',
        async (message) => {
          //Manage message base64 decoding
          const messageData = message.data;
          const string64 = this.decodeBase64(messageData);
          const originalString = this.decodeBase64(string64);
          const originalJson = JSON.parse(originalString);

          const relatorio = await this.getAll();

          await this.pubSubService.publishMessage(
            'projects/hackathon-fiap-ponto/topics/relatorio_ready',
            relatorio,
          );
        },
      );
      console.log('Subscribed to order_queue-sub successfully.');
    } catch (error) {
      console.error('Error subscribing to order_queue-sub:', error);
    }
  }
}

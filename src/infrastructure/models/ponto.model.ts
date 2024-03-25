import { Model, PrimaryKey } from 'sequelize-typescript';
import { Column, Table, DataType } from 'sequelize-typescript';

export type ListAttributes = {
  id: number;
  userId: string;
  timeStamp: Date;
};

@Table({ tableName: 'ponto' })
export class PontoModel extends Model<ListAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @Column
  userId: string;

  @Column
  timeStamp: Date;
}

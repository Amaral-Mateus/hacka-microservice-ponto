export class Ponto {
  userId: string;
  timeStamp: Date;

  constructor(userId: string, timeStamp: Date) {
    this.userId = userId;
    this.timeStamp = timeStamp;
  }
}

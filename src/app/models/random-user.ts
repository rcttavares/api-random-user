export class RandomUser {
  constructor(
    public id: number,
    public mediumPicture: string,
    public largePicture: string,
    public firstName: string,
    public fullName: string,
    public email: string,
    public birth: Date,
    public address: string,
    public city: string,
    public phone: number,
    public password: string
  ) { }
}

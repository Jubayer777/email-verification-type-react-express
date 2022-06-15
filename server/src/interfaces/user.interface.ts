import { Document} from 'mongoose';
export interface IUser extends Document {
    userName: string;
    email: string;
    expireAt: string;
    verified:boolean;
}
import { IUser } from "../../modules/UserModule/schemas/UserSchema";

declare global{
    namespace Express {
        interface Request {
            currentUser: IUser 
        }
    }
}
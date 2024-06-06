import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class LoginDTO {
    @IsPhoneNumber()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor(data: any) {
        this.phoneNumber = data.phoneNumber;
        this.password = data.password;
    }
}
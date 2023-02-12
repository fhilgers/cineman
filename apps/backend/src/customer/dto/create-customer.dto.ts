import { IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class CreateCustomerDto {

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;
}

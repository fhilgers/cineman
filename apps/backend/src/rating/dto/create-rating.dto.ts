import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from "class-validator";
import { IsCustomer } from "../../customer/customer.validator";
import { IsMovie } from "../../movie/movie.validator";
import { IsMovieRatingUniqueForCustomer } from "../rating.validator";

export class CreateRatingDto {

  @ApiProperty({
    description: "The Customer Rating of a movie",
    minimum: 0,
    maximum: 5,
  })
  @IsNumber()
  @Min(0)
  @Max(5)
  stars: number;

  @ApiProperty({
    description: "The Customer Review of a movie",
  })
  @IsNotEmpty()
  review: string;

  @ApiProperty({
    description: "The Customer who rates",
  })
  @IsCustomer()
  @IsUUID()
  customerId: string;

  @ApiProperty({
    description: "The Movie to rate",
  })
  @IsMovie()
  @IsUUID()
  @IsMovieRatingUniqueForCustomer('customerId')
  movieId: string;
}

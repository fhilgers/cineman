import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from "class-validator";
import { IsCustomer } from "../../customer/customer.validator";
import { IsMovie } from "../../movie/movie.validator";
import { IsMovieRatingUniqueForCustomer } from "../rating.validator";

export class CreateRatingDto {

  @IsNumber()
  @Min(0)
  @Max(5)
  stars: number;

  @IsNotEmpty()
  review: string;

  @IsCustomer()
  @IsUUID()
  customerId: string;

  @IsMovie()
  @IsUUID()
  @IsMovieRatingUniqueForCustomer('customerId')
  movieId: string;
}

import { Rating } from "@prisma/client";
import { CreateRatingDto } from "../dto/create-rating.dto";
import { UpdateRatingDto } from "../dto/update-rating.dto";

export interface IRatingGateway {

  create(createRatingDto: CreateRatingDto): Promise<Rating>;
  findAll() : Promise<Rating[]>;
  findOne(id: string) : Promise<Rating>;
  update(id: string, updateRatingDto: UpdateRatingDto) : Promise<Rating>;
  remove(id: string) : Promise<Rating>;
}

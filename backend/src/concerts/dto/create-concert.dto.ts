import { IsDateString, IsEmpty, IsInt, IsString, Min } from "class-validator";

export class CreateConcertDto {
    @IsString()
    @IsEmpty()
    artist: string;
    @IsDateString()
    @IsEmpty()
    @IsString()
    startTime: string;
    @IsInt()
    @IsEmpty()
    @Min(1)
    duration: number;



}

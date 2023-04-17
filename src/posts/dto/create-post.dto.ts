import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsString()
  @IsNotEmpty()
  readonly creator: string;

  @IsString({ each: true })
  @IsNotEmpty()
  readonly tags: string[];

  @IsString()
  @IsNotEmpty()
  readonly selectedFile: string;
}

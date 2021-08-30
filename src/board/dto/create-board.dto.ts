import { IsNotEmpty } from 'class-validator';

class CreateBoardDto {
  id: number;

  @IsNotEmpty()
  name: string;
}

export default CreateBoardDto;

import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  summary: string;

  @ApiProperty()
  description: string;
}

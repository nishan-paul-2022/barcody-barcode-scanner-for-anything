import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ExampleDto {
  @ApiProperty({
    description: 'The message content',
    example: 'Hello World!',
  })
  @IsString()
  @IsNotEmpty()
  message!: string;

  @ApiPropertyOptional({
    description: 'Optional metadata',
    example: { timestamp: '2023-01-01' },
  })
  @IsOptional()
  metadata?: Record<string, unknown>;
}

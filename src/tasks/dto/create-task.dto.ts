import { TaskStatus } from '../task-status.erum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateTaskDtp {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}

export class UpdateTaskDTP {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

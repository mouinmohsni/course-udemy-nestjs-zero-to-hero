import { TaskStatus } from '../task-status.erum';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { User } from "../../auth/user.entity";

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
  user: User;
}

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

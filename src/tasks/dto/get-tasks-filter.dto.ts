import { TaskStatus } from '../task-status.erum';
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class GetTasksFilterDT {
  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
  @IsString()
  @IsOptional()
  search?: string;
}

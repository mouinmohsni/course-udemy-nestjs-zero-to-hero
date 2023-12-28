import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import {
  CreateTaskDtp,
  UpdateTaskDTP,
  UpdateTaskStatusDto,
} from './dto/create-task.dto';
import { GetTasksFilterDT } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getOneTaskId(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getOneTaskId(id, user);
  }

  @Post()
  creatTask(
    @Body()
    createTaskDtp: CreateTaskDtp,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.creatTask(createTaskDtp, user);
  }

  @Delete('/:id')
  deleteOneTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTaskId(id, user);
  }

  @Put('/:id')
  updateTask(
    @Body() updateTaskDTP: UpdateTaskDTP,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.update(updateTaskDTP, id, user);
  }

  @Get('')
  getAll(
    @Query() filterDTo: GetTasksFilterDT,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      'user' +
        user.username +
        ' retrieving all tasks' +
        JSON.stringify(filterDTo),
    );
    return this.tasksService.getAllTasks(filterDTo, user);
  }

  @Put('/:id/status')
  updateTaskStates(
    @Body() updateStatus: UpdateTaskStatusDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateStatus;
    return this.tasksService.updateStatus(status, id, user);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query, UseGuards
} from "@nestjs/common";
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import {
  CreateTaskDtp,
  UpdateTaskDTP,
  UpdateTaskStatusDto,
} from './dto/create-task.dto';
import { GetTasksFilterDT } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  getOneTaskId(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getOneTaskId(id);
  }

  @Post()
  creatTask(@Body() createTaskDtp: CreateTaskDtp): Promise<Task> {
    return this.tasksService.creatTask(createTaskDtp);
  }

  @Delete('/:id')
  deleteOnetask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskId(id);
  }

  @Put('/:id')
  updateTask(
    @Body() updateTaskDTP: UpdateTaskDTP,
    @Param('id') id: string,
  ): Promise<Task> {
    return this.tasksService.update(updateTaskDTP, id);
  }

  // @Get()
  // getallTasks(@Query() filterDTo: GetTasksFilterDT): Task[] {
  //   if (Object.keys(filterDTo).length) {
  //     return this.tasksService.getTasksWithFilter(filterDTo);
  //   } else {
  //     return this.tasksService.allTasks();
  //   }
  // }

  @Get('')
  getall(@Query() filterDTo: GetTasksFilterDT): Promise<Task[]> {
    return this.tasksService.getallTasks(filterDTo);
  }

  @Put('/:id/status')
  updateTaskstates(
    @Body() updateStatus: UpdateTaskStatusDto,
    @Param('id') id: string,
  ): Promise<Task> {
    const { status } = updateStatus;
    return this.tasksService.updateStatus(status, id);
  }
}

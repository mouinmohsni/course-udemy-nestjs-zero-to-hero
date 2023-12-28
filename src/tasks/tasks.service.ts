import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDtp, UpdateTaskDTP } from './dto/create-task.dto';
import { TaskStatus } from './task-status.erum';
import { GetTasksFilterDT } from './dto/get-tasks-filter.dto';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService', { timestamp: true });
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  async getOneTaskId(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException('no tasks with this id ');
    }
    return found;
  }

  async creatTask(createTaskDtp: CreateTaskDtp, user: User): Promise<Task> {
    const { title, description } = createTaskDtp;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    const result = await this.taskRepository.save(task);
    console.log('result crate: ', result);
    return task;
  }

  async deleteTaskId(id: string, user: User): Promise<void> {
    const taskToDelete: Task = await this.getOneTaskId(id, user);
    const result = await this.taskRepository.delete(taskToDelete);
    if (result.affected === 0) {
      throw new NotFoundException(' ');
    }
  }
  async update(
    updateTaskDTP: UpdateTaskDTP,
    id: string,
    user: User,
  ): Promise<Task> {
    const { title, description, status } = updateTaskDTP;
    let taskToUpdate: Task = await this.getOneTaskId(id, user);
    taskToUpdate = {
      id,
      title: title,
      description: description,
      status: status,
      user: user,
    };
    // const newTask = this.tasksRepository.create(taskToUpdate);
    const result = await this.taskRepository.save(taskToUpdate);
    console.log('result update : ', result);
    if (!result) {
      throw new NotFoundException('problem update  ');
    }
    return result;
  }

  async updateStatus(
    status: TaskStatus,
    id: string,
    user: User,
  ): Promise<Task> {
    const taskToUpdate: Task = await this.getOneTaskId(id, user);
    taskToUpdate.status = status;
    const result = await this.taskRepository.save(taskToUpdate);
    console.log('result update : ', result);
    if (!result) {
      throw new NotFoundException('problem update  ');
    }
    return result;
  }
  async getAllTasks(filterDTo: GetTasksFilterDT, user: User): Promise<Task[]> {
    const { status, search } = filterDTo;
    const query = this.taskRepository.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status11', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) Like LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const result = await query.getMany();
      return result;
    } catch (error) {
      this.logger.error('errer', error);
      throw new InternalServerErrorException();
    }
  }
}

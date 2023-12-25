import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDtp, UpdateTaskDTP } from './dto/create-task.dto';
import { TaskStatus } from './task-status.erum';
import { GetTasksFilterDT } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository,
  ) {}
  async getOneTaskId(id: string): Promise<Task> {
    console.log(id);
    const found = await this.tasksRepository.findOne({ where: { id } });
    console.log('found', found);
    if (!found) {
      throw new NotFoundException('no tasks with this id ');
    }
    return found;
  }

  async creatTask(createTaskDtp: CreateTaskDtp): Promise<Task> {
    const { title, description } = createTaskDtp;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    const result = await this.tasksRepository.save(task);
    console.log('result crate: ', result);
    return task;
  }

  async deleteTaskId(id: string): Promise<void> {
    const taskToDelete: Task = await this.getOneTaskId(id);
    const result = await this.tasksRepository.delete(taskToDelete);
    if (result.affected === 0) {
      throw new NotFoundException(' ');
    }
  }
  async update(updateTaskDTP: UpdateTaskDTP, id: string): Promise<Task> {
    const { title, description, status } = updateTaskDTP;
    let taskToUpdate: Task = await this.getOneTaskId(id);
    taskToUpdate = {
      id,
      title: title,
      description: description,
      status: status,
    };
    // const newTask = this.tasksRepository.create(taskToUpdate);
    const result = await this.tasksRepository.save(taskToUpdate);
    console.log('result update : ', result);
    if (!result) {
      throw new NotFoundException('problem update  ');
    }
    return result;
  }

  async updateStatus(status: TaskStatus, id: string): Promise<Task> {
    const taskToUpdate: Task = await this.getOneTaskId(id);
    taskToUpdate.status = status;
    const result = await this.tasksRepository.save(taskToUpdate);
    console.log('result update : ', result);
    if (!result) {
      throw new NotFoundException('problem update  ');
    }
    return result;
  }
  async getallTasks(filterDTo: GetTasksFilterDT): Promise<Task[]> {
    const { status, search } = filterDTo;
    const query = this.tasksRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) Like LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const result = await query.getMany();
    console.log('get all : ', result);
    return result;
  }
}

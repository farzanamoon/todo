import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Task from './entities/task.entity';

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto) {
    const { summary, description } = createTaskDto;
    await Task.create({ summary, description });
    return { message: 'This action adds a new task' };
  }

  async findAll() {
    return await Task.findAll({});
  }

  async findOne(id: number) {
    const task = await Task.findByPk(id, {});
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return {
      message: 'Tasks:',
      data: task,
    };
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const { summary, description } = updateTaskDto;

    await task.update({
      summary,
      description,
    });
    return { message: 'Task updated successfully' };
  }

  async remove(id: number) {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return `This action removes a task`;
  }
}

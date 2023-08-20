import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) { }

    findAll() {
        return this.taskModel.find()
    }

    async create(createTaskDTO: CreateTaskDTO) {
        const newTask = await this.taskModel.create(createTaskDTO)
        return newTask;
    }

    async findOne(id: string) {
        return this.taskModel.findById(id);
    }

    async delete(id: string) {
        return this.taskModel.findByIdAndDelete(id);
    }

    async update(id: string, task: UpdateTaskDTO) {
        return this.taskModel.findByIdAndUpdate(id, task);
    }
}

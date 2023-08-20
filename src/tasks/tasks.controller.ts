import { Controller, Get, Post, Delete, Put, Body, Param, ConflictException, NotFoundException, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TasksService) { }

    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        const task = await this.taskService.findOne(id);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        return task;
    }

    @Post()
    async create(@Body() body: CreateTaskDTO) {
        try {
            return await this.taskService.create(body);
        }
        catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Task already exists');
            }

            throw error;
        }
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {

        const deletedTask = await this.taskService.delete(id);
        if (!deletedTask) {
            throw new NotFoundException("Task not found");
        }

        return deletedTask;
    }

    @Put(":id")
    async update(@Param('id') id: string, @Body() body: UpdateTaskDTO) {
        const updatedTask = await this.taskService.update(id, body);
        if (!updatedTask) {
            throw new NotFoundException("Task not found");
        }

        return updatedTask;
    }
}


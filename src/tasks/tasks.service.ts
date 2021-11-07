import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ){}
    
    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne(id); 
        if(!found){
            throw new NotFoundException(`Task with id ${id} not found!`);
        }
        
        return found;
    }
    // private tasks: Task[] = [];

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDTO: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDTO;

    //     let tasks = this.getAllTasks();

    //     if(status) {
    //         tasks = tasks.filter((task) => task.status === status);
    //     }

    //     if(search) {
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    //     }

    //     return tasks;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };
        
    //     this.tasks.push(task);

    //     return task;
    // }

    // deleteTask(id: string): Task {
    //     const task = this.getTaskById(id);
    //     this.tasks = this.tasks.filter((t) => t.id !== id);
    //     return task;
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}

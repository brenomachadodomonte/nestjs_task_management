import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    private logger = new Logger('TaskController');
    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDTO: GetTasksFilterDto, @GetUser() user: User): Promise<Task[]> {
        this.logger.verbose(`User "${user.username}" retreving all tasks. Filters: ${JSON.stringify(filterDTO)}`);
        return this.tasksService.getTasks(filterDTO, user);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        this.logger.verbose(`User "${user.username}" creating a task. DTO: ${JSON.stringify(createTaskDto)}`);
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
       @Param('id') id: string,
       @Body() updateTaskStatus: UpdateTaskStatusDto,
       @GetUser() user: User 
    ): Promise<Task> {
        const { status } = updateTaskStatus;
        return this.tasksService.updateTaskStatus(id, status, user);
    }
}

import { Folder, Response, Task, Priority } from "../models";
import { FolderRepository, TaskRepository, PriorityRepository } from "../repositories";
import { repository, Filter, FilterBuilder } from "@loopback/repository";


export class TaskService {

    constructor(
        @repository(FolderRepository)
        public folderRepository: FolderRepository,
        @repository(TaskRepository)
        public taskRepository: TaskRepository,
        @repository(PriorityRepository)
        public priorityRepository: PriorityRepository
    ) {}
    
    async getTaskList(filter: Filter<Task> | undefined) : Promise<Response<Task>> {
        const taskList: Array<Task> = await this.taskRepository.find(filter);
        console.log(`Tasks: ${JSON.stringify(taskList)}`);
        const taskListResult: Array<Task> = await Promise.all(await taskList.map(async (task: Task) => {
            // Folder
            let folder = new Folder();
            if (task.folderid) {
                folder = await this.folderRepository.findById(task.folderid);
            }
            
            // Priority
            let priority = new Priority();
            if (task.priorityid) {
                priority = await this.priorityRepository.findById(task.priorityid);
            }
            
            // setting names
            task.folderName = folder['name'];
            task.priorityName = priority['name'];
            console.log(`Task: ${JSON.stringify(task)}`);
            return task;
        }));
        const response = new Response<Task>();
        response.setError(false);
        response.setResult(taskListResult);
        console.log(`Response: ${JSON.stringify(response)}`);
        return response;
    }
    async getTaskDetails(id: string) : Promise<Response<Task>> {
        const task: Task = await this.taskRepository.findById(id);
        console.log(`Task: ${JSON.stringify(task)}`);
        const folder = await this.folderRepository.findById(task.folderid);
        // Priority
        const priority = await this.priorityRepository.findById(task.priorityid);
        // setting names
        task.folderName = folder['name'];
        task.priorityName = priority['name'];
        console.log(`Task after adding folder and priority name: ${JSON.stringify(task)}`);
        const response = new Response<Task>();
        response.setError(false);
        response.setResult([task]);
        console.log(`getTaskResult - Response: ${JSON.stringify(response)}`);
        return response;
    }
}



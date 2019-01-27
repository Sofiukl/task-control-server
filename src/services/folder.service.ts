import { Folder, Response, Task } from "../models";
import { FolderRepository, TaskRepository } from "../repositories";
import { repository, Filter, FilterBuilder } from "@loopback/repository";


export class FolderService {

    constructor(
        @repository(FolderRepository)
        public folderRepository: FolderRepository,
        @repository(TaskRepository)
        public taskRepository: TaskRepository
    ) {}
    
    async getFolderList(filter: Filter<Folder> | undefined) : Promise<Response<Folder>> {
        const folderList: Array<Folder> = await this.folderRepository.find(filter);
        const folderListResult: Folder[] = await Promise.all(await folderList.map(async (folder) => {
            const filterBuilder = new FilterBuilder();
            const filter = filterBuilder
            .fields('id', 'name', 'folderid', 'priorityid')
            .order(['id DESC'])
            .where({folderid: folder.id})
            .build();
            const tasks = await this.taskRepository.find(filter);
            folder.tasks = tasks;
            console.log(JSON.stringify(tasks));
            return folder;
        }));
        const response = new Response<Folder>();
        response.setError(false);
        response.setResult(folderListResult);
        return response;
    }


    async getFolderDetails(id: string) : Promise<Response<Folder>> {
        const folder: Folder = await this.folderRepository.findById(id);
        const filterBuilder = new FilterBuilder();
            const filter = filterBuilder
            .fields('id', 'name', 'folderid', 'priorityid')
            .order(['id DESC'])
            .where({folderid: folder.id})
            .build();
            const tasks = await this.taskRepository.find(filter);
            folder.tasks = tasks;
        const response = new Response<Folder>();
        response.setError(false);
        response.setResult([folder]);
        return response;
    }
}



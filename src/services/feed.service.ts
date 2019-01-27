import { Folder, Response, Task, Feed } from "../models";
import { FolderRepository, TaskRepository, FeedRepository } from "../repositories";
import { repository, Filter, FilterBuilder, WhereBuilder } from "@loopback/repository";


export class FeedService {

    constructor(
        @repository(FolderRepository)
        public folderRepository: FolderRepository,
        @repository(TaskRepository)
        public taskRepository: TaskRepository,
        @repository(FeedRepository)
        public feedRepository: FeedRepository
    ) {}
    
    async getFeedList(filter: Filter<Feed> | undefined) : Promise<Response<Feed>> {
        const feedList: Array<Feed> = await this.feedRepository.find(filter);
        const feedListResult: Feed[] = await Promise.all(await feedList.map(async (feed) => {
            const feedCriteriaStr = feed.criteria;
            const feedCriteriaObj = JSON.parse(feedCriteriaStr);
            const filterBuilder = new FilterBuilder();
            const filter = filterBuilder
            .fields('id', 'name', 'description', 'criteria')
            .order(['name DESC'])
            .where(feedCriteriaObj)
            .build();
            const tasks = await this.taskRepository.find(filter);
            feed.tasks = tasks;
            console.log(JSON.stringify(tasks));

            // count
            const whereBuilder = new WhereBuilder(feedCriteriaObj);
            const where = whereBuilder.build();
            const Count = await this.taskRepository.count(where);
            feed.taskCount = Count.count;
            console.log(Count);

            return feed;
        }));
        const response = new Response<Feed>();
        response.setError(false);
        response.setResult(feedListResult);
        return response;
    }
    async getFeedDetails(id: string) : Promise<Response<Feed>> {
        const feed: Feed = await this.feedRepository.findById(id);
        const feedCriteriaStr = feed.criteria;
        const feedCriteriaObj = JSON.parse(feedCriteriaStr);
        
        // task list
        const filterBuilder = new FilterBuilder();
        const filter = filterBuilder
        .fields('id', 'name', 'description', 'criteria')
        .order(['name DESC'])
        .where(feedCriteriaObj)
        .build();
        const tasks = await this.taskRepository.find(filter);
        feed.tasks = tasks;
        console.log(JSON.stringify(tasks));

        // task count
        const whereBuilder = new WhereBuilder(feedCriteriaObj);
        const where = whereBuilder.build();
        const Count = await this.taskRepository.count(where);
        feed.taskCount = Count.count
        console.log(Count);
        
        const response = new Response<Feed>();
        response.setError(false);
        response.setResult([feed]);
        return response;
    }
}
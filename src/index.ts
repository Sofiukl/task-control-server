import {TaskControlServerApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import {FolderService, TaskService, ProductService} from './services';
import { FeedService } from './services/feed.service';

export {TaskControlServerApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new TaskControlServerApplication(options);
  await app.boot();
  await app.start();

  app.bind('FolderService').toClass(FolderService);
  app.bind('TaskService').toClass(TaskService);
  app.bind('FeedService').toClass(FeedService);
  app.bind('ProductService').toClass(ProductService);

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);
  return app;
}
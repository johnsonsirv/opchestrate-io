import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //TODO: move to config b4 git commit
      host: 'localhost',
      port: 5432,
      database: 'task-aide',
      username: 'postgres',
      password: 'postgres',
      synchronize: true, //auto migrations, keep schemas in check
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}

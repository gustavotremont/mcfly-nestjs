import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.BBDD_URI),
    UsersModule,
    NotificationsModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

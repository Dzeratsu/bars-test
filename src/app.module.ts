import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TransportModule } from './transport/transport.module';
import { AuthModule } from './auth/auth.module';
import { TsgroupService } from './tsgroup/tsgroup.service';
import { TsgroupModule } from './tsgroup/tsgroup.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/bars-test'),
    UserModule,
    TransportModule,
    AuthModule,
    TsgroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

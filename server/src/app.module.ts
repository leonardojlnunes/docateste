import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { ProductModule } from './resources/product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://docato:1O6mmaZBMdnbNciB@cluster.v6aul.gcp.mongodb.net/docateste',
    ),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

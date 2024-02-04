import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivreService } from './livre/livre.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LivreModule } from './livre/livre.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/users.entity';
import { PagesService } from './pages/pages.service';
import { PagesController } from './pages/pages.controller';
import { PagesModule } from './pages/pages.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    LivreModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'biblio_tech_user',
      password: 'biblio_tech_password',
      database: 'biblio_tech_db',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    PagesModule,
    CategoriesModule,
  ],
  controllers: [AppController, PagesController],
  providers: [AppService, LivreService, PagesService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

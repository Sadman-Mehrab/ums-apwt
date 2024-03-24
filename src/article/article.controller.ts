import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDTO, UpdateArticleDTO } from './dto/article.dto';
import { ArticleEntity } from './entities/article.entity';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createArticleDto: CreateArticleDTO): Promise<ArticleEntity> {
    return this.articleService.create(createArticleDto);
  }

  @Get()
  findAll(@Query('sortByDate') sortByDate: string,@Query('sortByDate') sortByTag: string ): Promise<ArticleEntity[]> {
    if(!sortByDate) return this.articleService.findAll();

    if(sortByDate == 'ASC') return this.articleService.findByDateASC();
    
    if(sortByDate == 'DSC') return this.articleService.findByDateDSC();
    
    return this.articleService.findAll();
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ArticleEntity> {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDTO) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.remove(id);
  }
}

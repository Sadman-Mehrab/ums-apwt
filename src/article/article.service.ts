import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDTO, UpdateArticleDTO } from './dto/article.dto';
import { ArticleEntity } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
  ) {}

  async findIfExists(id: number): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({ id: id });
    if (!article) throw new NotFoundException();
    else return article;
  }

  async create(createArticleDto: CreateArticleDTO): Promise<ArticleEntity> {
    return await this.articleRepository.save(createArticleDto);
  }

  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleRepository.find({});
  }

  async findByDateASC(): Promise<ArticleEntity[]> {
    return await this.articleRepository.find({
      order: { datePublished: 'ASC' },
    });
  }

  async findByDateDSC(): Promise<ArticleEntity[]> {
    return await this.articleRepository.find({
      order: { datePublished: 'DESC' },
    });
  }

  async findOne(id: number) {
    const article = await this.findIfExists(id);
    return await this.articleRepository.findOneBy({ id: id });
  }

  async update(id: number, updateArticleDto: UpdateArticleDTO) {
    const article = await this.findIfExists(id);
    return await this.articleRepository.save({ id, updateArticleDto });
  }

  async remove(id: number) {
    const article = await this.findIfExists(id);
    return await this.articleRepository.delete(id);
  }
}

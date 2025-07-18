import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider {
    public async paginateQuery<T extends ObjectLiteral>(
        paginationQueryDto: PaginationQueryDto,
        repositroy: Repository<T>,
        where?: FindOptionsWhere<T>
    ) {
        const page = paginationQueryDto.page ?? 1;
        const limit = paginationQueryDto.limit ?? 10;
        const findOptions: FindManyOptions<T> = {
            skip: (page - 1) * limit,
            take: limit,
        }
        if (where) {
            findOptions.where = where
        }
        return await repositroy.find(findOptions)
    }
}

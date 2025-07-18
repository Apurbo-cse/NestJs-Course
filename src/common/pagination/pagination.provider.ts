import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider {
    public async paginateQuery<T extends ObjectLiteral>(
        paginationQueryDto: PaginationQueryDto,
        repository: Repository<T>,
        where?: FindOptionsWhere<T>
    ) {
        const currentPage = paginationQueryDto.page ?? 1;
        const limit = paginationQueryDto.limit ?? 10;

        const findOptions: FindManyOptions<T> = {
            skip: (currentPage - 1) * limit,
            take: limit,
        };

        if (where) {
            findOptions.where = where;
        }

        const [result, totalItems] = await repository.findAndCount(findOptions);
        const totalPages = Math.ceil(totalItems / limit);
        const nextPage = currentPage === limit ? currentPage : currentPage + 1
        const previousPage = currentPage === 1 ? currentPage : currentPage - 1

        const response = {
            data: result,
            meta: {
                itemsPerPage: limit,
                totalItems: totalItems,
                currentPage: currentPage,
                totalPages: totalPages,
            },
            links: {
            
            },
        };

        return response;
    }
}

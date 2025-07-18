
export interface Paginated<T> {
    data: T[],
    meta: {
        itemsPerPages: number;
        totalItems: number;
        currentPages: number;
        totalPages: number
    },
    links: {
        first: string;
        last: string;
        current: string;
        next: string
    }
}
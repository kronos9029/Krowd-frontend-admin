export type BaseReponse<T> = {
    data: T[];
    metadata: {
        page: number;
        size: number;
        total: number;
    };
};

export type TRequestPaging = {
    size?: number;
    page?: number;
};

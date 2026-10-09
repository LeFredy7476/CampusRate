export class Place {
    id: string;
    name: string;
    description: string;
    category: string;
    address: string;
    services: string[];
    status: string;
    averageRating?: number;
    reviewCount: number;
    createdAt: Date;
    updatedAt: Date;
}
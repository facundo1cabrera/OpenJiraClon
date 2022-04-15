interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Productosasdfa',
            status: 'pending',
            createdAt: 0
        },
        {
    
            description: 'Producdsdsfvftosasdfa',
            status: 'finished',
            createdAt: 22222222
        }
    ]
}
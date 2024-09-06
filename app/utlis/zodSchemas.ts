import { z } from 'zod';

export const siteSchema = z.object({
    name: z.string().min(1).max(35),
    subdirectory: z.string().min(1).max(40),
    description: z.string().min(1).max(155),    
});

export const articleSchema= z.object({
    title: z.string().min(1).max(100),
    slug: z.string().min(1).max(200),
    image: z.string().min(1),
    description: z.string().min(1).max(200), 
    articleContent: z.string().min(1)
});
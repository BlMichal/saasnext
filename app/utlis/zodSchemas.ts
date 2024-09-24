import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(1).max(35),
  subdirectory: z.string().min(1).max(40),
  description: z.string().min(1).max(155),
});

export const articleSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(200),
  image: z.string().min(1),
  description: z.string().min(1).max(200),
  articleContent: z.string().min(1),
});

export function SiteCreationSchema(option?: {
  isSubdirectoryUnique: () => Promise<boolean>;
}) {
  return z.object({
    subdirectory: z
      .string()
      .min(1)
      .max(40)
      .regex(/^[a-z]+$/, "Musí obsahovat jen malé písmena")
      .transform((value) => value.toLowerCase())
      .pipe(
        z.string().superRefine((email, ctx) => {
          if (typeof option?.isSubdirectoryUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }
          return option.isSubdirectoryUnique().then((isUnique) => {
            if(!isUnique) {
                ctx.addIssue({
                    code:'custom',
                    message:'Subdirectory s tímto názvem již existuje...'
                });
            }
          });
        })
      ),
      name: z.string().min(1).max(35),      
      description: z.string().min(1).max(155),
  });
}

import zod from "zod";

const mySchema = zod.object({
  title: zod.string().min(2, "To Short title"),
  description: zod.string().min(2, "To Short description"),
});

const mySchemaId = zod.object({
  id: zod.string().min(2),
});

export { mySchema, mySchemaId };

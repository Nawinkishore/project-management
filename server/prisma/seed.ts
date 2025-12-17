import fs from "fs";
import path from "path";
import { prisma } from "../src/lib/prisma";

async function deleteAllData(orderedFileNames: string[]) {
    const modelNames = orderedFileNames.map((fileName) => {
        const modelName = path.basename(fileName, path.extname(fileName));
        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
    });

    for (const modelName of modelNames) {
        const model: any = prisma[modelName as keyof typeof prisma];
        if (!model?.deleteMany) continue;

        try {
            await model.deleteMany({});
            console.log(`Cleared data from ${modelName}`);
        } catch (error) {
            console.error(`Error clearing ${modelName}:`, error);
        }
    }
}

async function main() {
    const dataDirectory = path.join(
        process.cwd(),
        "prisma",
        "seedData"
    );


    const orderedFileNames = [
        "team.json",
        "project.json",
        "projectTeam.json",
        "user.json",
        "task.json",
        "attachment.json",
        "comment.json",
        "taskAssignment.json",
    ];

    await deleteAllData(orderedFileNames);

    for (const fileName of orderedFileNames) {
        const filePath = path.join(dataDirectory, fileName);
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const modelName = path.basename(fileName, path.extname(fileName));
        const model: any = prisma[modelName as keyof typeof prisma];
        if (!model?.create) continue;

        for (const data of jsonData) {
            await model.create({ data });
        }

        console.log(`Seeded ${modelName}`);
    }
}

main()
    .catch(console.error)
    .finally(async () => prisma.$disconnect());

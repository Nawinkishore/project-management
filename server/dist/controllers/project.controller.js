import { prisma } from "../lib/prisma.js";
export const getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects",
            error
        });
    }
};
export const createProject = async (req, res) => {
    const { name, description, startDate, endDate } = req.body;
    try {
        const newProject = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate
            }
        });
        res.status(200).json(newProject);
    }
    catch (error) {
        res.status(500).json({
            message: "Error to create project",
            error
        });
    }
};
//# sourceMappingURL=project.controller.js.map
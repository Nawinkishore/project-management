import { prisma } from "../lib/prisma.js";
export const getTasks = async (req, res) => {
    const { projectId } = req.query;
    try {
        const tasks = await prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            },
        });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error,
        });
    }
};
export const createTask = async (req, res) => {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    try {
        const newTask = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            },
        });
        res.status(200).json(newTask);
    }
    catch (error) {
        res.status(500).json({
            message: "Error to create task",
            error,
        });
    }
};
export const updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: status,
            }
        });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update task status",
            error,
        });
    }
};
//# sourceMappingURL=task.controller.js.map
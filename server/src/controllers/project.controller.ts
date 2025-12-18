import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";

export const getProjects = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.status(200).json(projects);
    } catch (error: any) {
        res.status(500).json({
            message: "Failed to fetch projects",
            error
        });
    }
};

export const createProject = async (
    req: Request,
    res: Response
): Promise<void> => {
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
    } catch (error: any) {
        res.status(500).json({
            message: "Error to create project",
            error
        });
    }
};


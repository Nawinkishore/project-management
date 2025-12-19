"use client";

import { useGetProjects } from "@/features/projects/api";
import { useParams } from "next/navigation";
import { useState } from "react";
import ProjectHeader from "../../../components/project/ProjectHeader";
import Board from "../../../components/project/BoardView";
import ListView from "../../../components/project/ListView";

export default function ProjectPage() {
  const {id} = useParams<{id: string}>();
  const [activeTab,setActiveTab] = useState("Board");
  const [isModalNewTaskOpen,setIsModalNewTaskOpen] = useState(false);
  

  return <div>
    <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    {activeTab === "Board" && (
      <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
    )}
    {activeTab === "List" && (
      <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
    )}

  </div>;

}

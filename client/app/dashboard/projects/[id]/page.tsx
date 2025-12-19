"use client";

import { useGetProjects } from "@/features/projects/api";
import { useParams } from "next/navigation";
import { useState } from "react";
import ProjectHeader from "../ProjectHeader";
import Board from "../BoardView";

export default function ProjectPage() {
  const {id} = useParams<{id: string}>();
  const {data : project} = useGetProjects();
  const [activeTab,setActtiveTab] = useState("Board");
  const [isModleNewTaskOpen,setIsModleNewTaskOpen] = useState(false);
  

  return <div>
    <ProjectHeader activeTab={activeTab} setActiveTab={setActtiveTab} />
    {activeTab === "Board" && (
      <Board id={id} setIsModalNewTaskOpen={setIsModleNewTaskOpen} />
    )}
  </div>;

}

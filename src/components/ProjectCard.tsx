import React from "react";
import { Project, RiskLevel, ProjectStatus } from "../types";
import { MapPin, ArrowUpRight, TrendingUp, User, Sprout, Coins } from "lucide-react";
import { motion } from "motion/react";

interface ProjectCardProps {
  key?: string;
  project: Project;
  onViewDetails: (project: Project) => void;
}

export default function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const progressPercent = Math.min(
    Math.round((project.fundingRaised / project.fundingTarget) * 100),
    100
  );

  const getRiskBadgeColor = (level: RiskLevel) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "High":
        return "bg-rose-100 text-rose-850 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusLabelAndColor = (status: ProjectStatus) => {
    switch (status) {
      case "Funding":
        return { label: "Đang gọi vốn", color: "bg-blue-600 text-white" };
      case "Cultivating":
        return { label: "Đang canh tác", color: "bg-emerald-600 text-white" };
      case "Harvested":
        return { label: "Đã thu hoạch", color: "bg-amber-500 text-slate-900" };
      default:
        return { label: "Không xác định", color: "bg-slate-500" };
    }
  };

  const statusInfo = getStatusLabelAndColor(project.status);

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Target Image & Badge */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>
        
        {/* Project status badge */}
        <span className={`absolute top-4 left-4 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${statusInfo.color} shadow-sm font-mono`}>
          {statusInfo.label}
        </span>

        {/* Risk Badge */}
        <span className={`absolute top-4 right-4 text-[10px] uppercase tracking-wider font-bold border px-2 py-0.5 rounded-md ${getRiskBadgeColor(project.riskLevel)}`}>
          Rủi ro: {project.riskLevel}
        </span>

        {/* Crops Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-emerald-850 flex items-center space-x-1">
          <Sprout className="size-3 text-emerald-600" />
          <span>{project.cropType}</span>
        </div>
      </div>

      {/* Contents and descriptions */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Location */}
          <div className="flex items-center text-xs text-slate-500 space-x-1">
            <MapPin className="size-3 flex-shrink-0 text-emerald-600" />
            <span className="truncate">{project.location}</span>
          </div>

          {/* Title */}
          <h3 className="font-display font-semibold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition" title={project.title}>
            {project.title}
          </h3>

          {/* Farmer */}
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            {project.farmerAvatar ? (
              <img src={project.farmerAvatar} alt={project.farmerName} className="size-5 rounded-full object-cover border border-slate-205" />
            ) : (
              <User className="size-4" />
            )}
            <span className="font-medium">Nông hộ: {project.farmerName}</span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* RWA Financial Specs Row */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl my-4">
          <div>
            <span className="block text-[10px] font-mono text-slate-400">ROI CAM KẾT</span>
            <span className="text-base font-bold text-emerald-700 flex items-center gap-0.5">
              <TrendingUp className="size-4 text-emerald-600" />
              {project.expectedRoi}%
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-slate-400">CHU KỲ NUÔI</span>
            <span className="text-sm font-semibold text-slate-800">
              {project.duration} Tháng
            </span>
          </div>
        </div>

        {/* Progress Bar & Buttons */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <div className="flex items-center space-x-1">
                <Coins className="size-3 text-emerald-600" />
                <span className="font-semibold text-slate-800">
                  {project.fundingRaised.toLocaleString()} USDC
                </span>
              </div>
              <span className="text-slate-400">
                đã thu / {project.fundingTarget.toLocaleString()} (Target)
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-slate-500">Tiến trình gọi vốn</span>
              <span className="font-bold text-emerald-700">{progressPercent}%</span>
            </div>
          </div>

          <button
            onClick={() => onViewDetails(project)}
            className="w-full mt-2 flex items-center justify-center space-x-2 bg-slate-900 group-hover:bg-emerald-800 text-white hover:bg-emerald-800 py-3 rounded-xl text-xs font-bold font-mono tracking-wider transition-all duration-200 shadow-sm"
          >
            <span>XEM CHI TIẾT CONTRACT</span>
            <ArrowUpRight className="size-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

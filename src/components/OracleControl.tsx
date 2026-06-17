import React from "react";
import { Project } from "../types";
import { CloudLightning, Sun, CloudSun, TrendingUp, TrendingDown, RefreshCw, BarChart2 } from "lucide-react";

interface OracleControlProps {
  onSimulateWeather: (type: "storm" | "heatwave" | "clear") => void;
  onSimulateMarket: (type: "rally" | "dump" | "stable") => void;
  projects: Project[];
}

export default function OracleControl({
  onSimulateWeather,
  onSimulateMarket,
  projects,
}: OracleControlProps) {
  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-emerald-950 px-2.5 py-0.5 rounded-full text-xs font-mono text-emerald-400">
            <span>Aggregated Node API</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Kênh Mô Phỏng Dữ Liệu Oracle Thực Tế</h2>
          <p className="text-slate-400 text-xs md:text-sm font-light">
            Ký gửi và tự động hóa các phản hồi khẩn cấp của Smart Contract Soroban thông qua dữ liệu khí tượng và chỉ số sàn nông sản DEX thế giới.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <RefreshCw className="size-3 text-emerald-500 animate-spin" />
          <span>Oracle Live Feed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Weather Simulator Control */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-300">
            <Sun className="size-4 text-amber-500" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Trạm Thời Tiết Nông Nghiệp IoT</h3>
          </div>
          <p className="text-slate-400 text-xs">
            Mô phỏng thay đổi khí hậu khẩn cấp để kiểm tra hệ thống cảnh báo cảnh quan, IoT theo dõi độ ẩm và sức khỏe cây trồng tự động.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => onSimulateWeather("storm")}
              className="px-4 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-800 rounded-2xl text-xs font-semibold text-rose-300 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <CloudLightning className="size-3.5" />
              <span>Gió Bão Lũ Lụt</span>
            </button>
            <button
              onClick={() => onSimulateWeather("heatwave")}
              className="px-4 py-2 bg-amber-950 hover:bg-amber-900 border border-amber-800 rounded-2xl text-xs font-semibold text-amber-300 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Sun className="size-3.5" />
              <span>Hạn Mặn Kéo Dài</span>
            </button>
            <button
              onClick={() => onSimulateWeather("clear")}
              className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-2xl text-xs font-semibold text-emerald-300 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <CloudSun className="size-3.5" />
              <span>Thời Tiết Lý Tưởng</span>
            </button>
          </div>
        </div>

        {/* Market Price Control */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-300">
            <BarChart2 className="size-4 text-emerald-500" />
            <h3 className="font-bold text-sm uppercase tracking-wider">Tỷ Giá Nông Sản Sàn AgriDEX</h3>
          </div>
          <p className="text-slate-400 text-xs">
            Thay đổi nhu cầu thị trường toàn cầu. Smart Contract tự động tính toán lại định giá RWA và tỷ suất ROI hoàn vốn dựa trên các mức giá này.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              onClick={() => onSimulateMarket("rally")}
              className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-2xl text-xs font-semibold text-emerald-300 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <TrendingUp className="size-3.5" />
              <span>Thị Trường Tăng Giá</span>
            </button>
            <button
              onClick={() => onSimulateMarket("dump")}
              className="px-4 py-2 bg-rose-950 hover:bg-rose-900 border border-rose-800 rounded-2xl text-xs font-semibold text-rose-300 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <TrendingDown className="size-3.5" />
              <span>Thị Trường Giảm Giá</span>
            </button>
            <button
              onClick={() => onSimulateMarket("stable")}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-xs font-semibold text-slate-350 transition-all flex items-center gap-1.5 active:scale-95"
            >
              <RefreshCw className="size-3.5" />
              <span>Giá Cân Bằng Chuẩn</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

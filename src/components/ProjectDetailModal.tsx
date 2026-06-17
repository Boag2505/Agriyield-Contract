import React, { useState } from "react";
import { Project, UserWallet } from "../types";
import { X, Calendar, MapPin, Gauge, DollarSign, Thermometer, Droplets, CloudRain, ShieldCheck, Heart } from "lucide-react";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  wallet: UserWallet;
  onInvest: (projectId: string, amount: number) => Promise<{ success: boolean; message: string }>;
  triggerWalletConnect: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
  wallet,
  onInvest,
  triggerWalletConnect,
}: ProjectDetailModalProps) {
  const [amount, setAmount] = useState("500");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const parsedAmount = parseFloat(amount) || 0;
  const expectedProfit = Math.round(parsedAmount * (project.expectedRoi / 100));
  const totalReturn = parsedAmount + expectedProfit;

  const handleApplyInvest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.connected) {
      triggerWalletConnect();
      return;
    }
    if (parsedAmount <= 0) {
      alert("Vui lòng nhập số tiền hợp lý!");
      return;
    }
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const response = await onInvest(project.id, parsedAmount);
      if (response.success) {
        setSuccessMsg(response.message);
      } else {
        setErrorMsg(response.message);
      }
    } catch (err: any) {
      setErrorMsg("Giao dịch xảy ra lỗi: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-slate-100 flex flex-col">
        {/* Header Photo block */}
        <div className="relative h-60 bg-slate-100 flex-shrink-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/40 hover:bg-slate-900/70 p-2 text-white rounded-full transition-all"
          >
            <X className="size-5" />
          </button>
          <div className="absolute bottom-4 left-6 text-white text-left space-y-1">
            <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              {project.cropType}
            </span>
            <h2 className="text-xl sm:text-2xl font-black drop-shadow-md">{project.title}</h2>
          </div>
        </div>

        {/* Modal body block */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-left overflow-y-auto">
          {/* Left specification column */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400">Diện tích & Định vị địa lý</h3>
              <p className="text-slate-650 text-sm leading-relaxed">{project.description}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1.5">
                <MapPin className="size-4 text-emerald-600" />
                <span className="font-medium text-slate-700">{project.location}</span>
              </div>
            </div>

            {/* Quick Metrics stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-5">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Dự kiến Lợi tức</span>
                <span className="text-lg font-black text-emerald-600">{project.expectedRoi}% ROI</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Diện Tích Đất</span>
                <span className="text-lg font-black text-slate-900">{project.area} Hecta</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Vụ Mùa Cam Kết</span>
                <span className="text-lg font-black text-slate-900">{project.expectedYield} Tấn</span>
              </div>
            </div>

            {/* Oracle Live Telemetry block */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 font-mono">
                Cảm Biến Telemetry Oracle Thống Kê
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center space-y-1">
                  <Thermometer className="size-4 text-orange-500 mx-auto" />
                  <span className="text-[10px] text-slate-400 block">Nhiệt Độ</span>
                  <span className="text-xs font-bold text-slate-800">{project.oracleWeather.temperature}°C</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center space-y-1">
                  <CloudRain className="size-4 text-sky-500 mx-auto" />
                  <span className="text-[10px] text-slate-400 block">Lượng mưa</span>
                  <span className="text-xs font-bold text-slate-800">{project.oracleWeather.rainfallMm} mm</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 text-center space-y-1">
                  <DollarSign className="size-4 text-emerald-500 mx-auto" />
                  <span className="text-[10px] text-slate-400 block">Định giá lúa</span>
                  <span className="text-xs font-bold text-slate-800">${project.oracleMarketPrice.currentPrice}/{project.oracleMarketPrice.unit}</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center font-mono italic">
                Cập nhật lần cuối: {project.oracleWeather.lastUpdated}
              </p>
            </div>

            {/* Timeline audits log */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 font-mono">
                Nhật Ký Bảo Chứng On-chain
              </h4>
              <div className="space-y-4 border-l-2 border-emerald-500 pl-4 ml-2">
                {project.updates.map((up, i) => (
                  <div key={i} className="relative space-y-1 text-xs">
                    <span className="absolute -left-[22px] top-1 size-2 rounded-full bg-emerald-500 ring-4 ring-white" />
                    <span className="text-slate-400 font-mono text-[10px]">{up.date} ({up.stage})</span>
                    <p className="font-bold text-slate-900">{up.statusText}</p>
                    <p className="text-slate-500 font-light leading-relaxed">{up.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Investing/Pledge form */}
          <div className="md:col-span-5 bg-slate-50/50 border border-slate-100 rounded-3xl p-6 h-fit space-y-5">
            <div className="space-y-1">
              <span className="text-emerald-700 font-mono text-[10px] uppercase font-bold block">
                MỞ CHIẾN DỊCH HUY ĐỘNG RWA
              </span>
              <h4 className="font-bold text-slate-900 text-base">Góp vốn vào vụ mùa này</h4>
              <p className="text-xs text-slate-500">Mã hóa nộp hạn mức, không lo lạm phát tài sản</p>
            </div>

            {/* If success show modal status */}
            {successMsg ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-4 text-xs space-y-2">
                <p className="font-bold">🎉 Thành công rực rỡ!</p>
                <p className="leading-relaxed font-light">{successMsg}</p>
                <button
                  onClick={onClose}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 rounded-xl text-center"
                >
                  Xong
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyInvest} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 block">Chọn lượng USDC góp vốn</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400">$</span>
                    <input
                      type="number"
                      required
                      min="50"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={loading || project.status !== "Funding"}
                      className="w-full pl-7 pr-12 py-3 bg-white border border-slate-200 rounded-xl font-mono text-sm focus:outline-none focus:border-emerald-600"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-slate-400">USDC</span>
                  </div>
                </div>

                {/* Returns summary mock */}
                <div className="bg-white border border-slate-100 rounded-2xl p-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mức lợi nhuận ({project.expectedRoi}%):</span>
                    <span className="font-bold text-emerald-600">+${expectedProfit.toLocaleString()} USDC</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-50 pt-2 text-sm">
                    <span className="text-slate-800 font-sans font-bold">Tổng thu hái:</span>
                    <span className="font-black text-slate-900">${totalReturn.toLocaleString()} USDC</span>
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-rose-600 text-xs text-center font-bold">⚠️ {errorMsg}</p>
                )}

                {wallet.connected ? (
                  <button
                    type="submit"
                    disabled={loading || project.status !== "Funding"}
                    className="w-full bg-slate-900 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="size-4" />
                    <span>{loading ? "Đang mở Freighter..." : project.status !== "Funding" ? "Đợt huy động đóng" : "Đồng Ý Ký & Góp Vốn"}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={triggerWalletConnect}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Mở Ví Để Ký Đầu Tư</span>
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

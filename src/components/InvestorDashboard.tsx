import React, { useState } from "react";
import { Project, UserInvestment, UserWallet } from "../types";
import { Search, Filter, Shield, Info, Sprout, ArrowUpRight, TrendingUp } from "lucide-react";

interface InvestorDashboardProps {
  projects: Project[];
  wallet: UserWallet;
  investments: UserInvestment[];
  onViewProject: (p: Project) => void;
  triggerWalletConnect: () => void;
}

export default function InvestorDashboard({
  projects,
  wallet,
  investments,
  onViewProject,
  triggerWalletConnect,
}: InvestorDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filterCrops = Array.from(new Set(projects.map((p) => p.cropType)));

  const filteredProjects = projects.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCrop = selectedCrop === "all" || p.cropType === selectedCrop;
    const matchStatus = selectedStatus === "all" || p.status === selectedStatus;
    return matchSearch && matchCrop && matchStatus;
  });

  return (
    <div className="space-y-12 font-sans">
      {/* Portfolio Quick Summary of Connected wallet */}
      {wallet.connected && investments.length > 0 && (
        <section className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <Shield className="size-5 text-emerald-600" />
              <span>Danh Mục RWA Đang Sở Hữu</span>
            </h3>
            <span className="font-mono text-xs text-slate-500">Mạng lưới thử nghiệm Stellar</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block">Tổng Vốn Góp</span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                ${investments.reduce((acc, cur) => acc + cur.amountInvested, 0).toLocaleString()} USDC
              </span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block">Ước Tính Lợi Tức</span>
              <span className="text-2xl font-black text-emerald-600 mt-1 block">
                +${investments.reduce((acc, cur) => acc + (cur.expectedReturns - cur.amountInvested), 0).toLocaleString()} USDC
              </span>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-wider block">ROI Trung Bình</span>
              <span className="text-2xl font-black text-amber-500 mt-1 block">
                {(investments.reduce((acc, cur) => acc + cur.roi, 0) / (investments.length || 1)).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Investment Logs Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-550 border-b border-slate-100 text-xs uppercase text-slate-500 font-mono">
                <tr>
                  <th className="px-6 py-3.5">Mã Giao Dịch</th>
                  <th className="px-6 py-3.5">Dự Án Nông Sản</th>
                  <th className="px-6 py-3.5 text-right">Lượng Đầu Tư</th>
                  <th className="px-6 py-3.5 text-right">Dự Kiến Thu Hồi</th>
                  <th className="px-6 py-3.5 text-center">Trạng Thái Vụ Mùa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                {investments.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/55 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{inv.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900 max-w-xs truncate">{inv.projectTitle}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">${inv.amountInvested.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600">${inv.expectedReturns.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        inv.status === "Funding" ? "bg-amber-100 text-amber-800" :
                        inv.status === "Cultivating" ? "bg-sky-100 text-sky-800" :
                        inv.status === "Harvested" ? "bg-emerald-100 text-emerald-800" :
                        "bg-slate-100 text-slate-800"
                      }`}>
                        {inv.status === "Funding" ? "Đang gieo mầm" :
                         inv.status === "Cultivating" ? "Đang nuôi trồng" :
                         inv.status === "Harvested" ? "Đã thu hoạch" :
                         inv.status === "Distributed" ? "Đã tất toán" : inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Main Browse Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-950">Dự án RWA nông nghiệp khả dụng</h3>
            <p className="text-xs text-slate-500">Tìm kiếm, lọc các đợt đúc RWA thích hợp cho chiến lược của bạn</p>
          </div>

          {/* Search filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 class size-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tên, địa điểm vụ mùa..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
            >
              <option value="all">Tất cả giống cây</option>
              {filterCrops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
            >
              <option value="all">Tất cả giai đoạn</option>
              <option value="Funding">Huy động vốn (Funding)</option>
              <option value="Cultivating">Chăm sóc (Cultivating)</option>
              <option value="Harvested">Đã thu hoạch (Harvested)</option>
              <option value="Distributed">Tất toán (Distributed)</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => {
            const pct = Math.min(100, Math.round((p.fundingRaised / p.fundingTarget) * 100));
            return (
              <div 
                key={p.id}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Photo & ROI tag */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-emerald-600 text-white font-sans text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <TrendingUp className="size-3.5" />
                      <span>ROI {p.expectedRoi}%</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 font-sans text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                      {p.duration} Tháng
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-emerald-700 font-mono text-[10px] uppercase font-bold tracking-wider">
                        {p.cropType} @ {p.location.split(',')[1] || p.location}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                        {p.title}
                      </h4>
                      <p className="text-slate-500 text-xs font-light line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    {/* Progress slider for funding */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Đã thu hút: <strong className="text-slate-800">${p.fundingRaised.toLocaleString()}</strong></span>
                        <span>Mục tiêu: ${p.fundingTarget.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full rounded-full transition-all" 
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>{pct}% Đã Hoàn Thành</span>
                        <span>{p.investorsCount} nhà đóng góp</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer specs & Button */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Trạng Thái vụ</span>
                    <span className={`inline-flex items-center gap-1 text-xs font-extrabold mt-0.5 ${
                      p.status === "Funding" ? "text-amber-500" :
                      p.status === "Cultivating" ? "text-sky-600" :
                      "text-emerald-600"
                    }`}>
                      <Sprout className="size-3.5" />
                      {p.status === "Funding" ? "Đang huy động" :
                       p.status === "Cultivating" ? "Chăm sóc trồng trọt" :
                       p.status === "Harvested" ? "Đã gặt hái" : "Tất toán RWA"}
                    </span>
                  </div>

                  <button
                    onClick={() => onViewProject(p)}
                    className="inline-flex items-center gap-1 bg-white hover:bg-emerald-600 border border-slate-200 hover:border-emerald-600 hover:text-white text-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                  >
                    <span>Xem Chi Tiết</span>
                    <ArrowUpRight className="size-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-16 text-center space-y-2">
              <p className="text-slate-400 text-sm">Không tìm thấy dự án nông nghiệp nào đang khớp với bộ lọc.</p>
              <button 
                onClick={() => { setSearchTerm(""); setSelectedCrop("all"); setSelectedStatus("all"); }}
                className="text-emerald-700 text-xs font-bold hover:underline"
              >
                Đặt lại toàn bộ tiêu chuẩn lọc
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

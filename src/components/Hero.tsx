import React from "react";
import { Coins, User, Landmark, ShieldCheck, Sprout, TrendingUp, Handshake } from "lucide-react";

interface HeroProps {
  stats: {
    totalHuyDong: number;
    soDuAn: number;
    nongDanThamGia: number;
    sanLuongCamKet: number;
  };
  onExplore: () => void;
  onFarmerCreate: () => void;
}

export default function Hero({ stats, onExplore, onFarmerCreate }: HeroProps) {
  return (
    <div className="space-y-16 py-6 font-sans">
      {/* Hero Header Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-emerald-100">
            <ShieldCheck className="size-3.5" />
            <span>Mã hóa Tài Sản Thực (RWA) trên Blockchain Stellar Soroban</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-sans text-slate-900 tracking-tight leading-[1.1]">
            Đầu Tư Nông Nghiệp <br />
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-amber-500 bg-clip-text text-transparent">
              Chính Xác & Minh Bạch
            </span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
            AgriYield định danh kỹ thuật số (RWA) sản lượng nông sản chất lượng cao của nông dân Việt Nam. Nhờ Smart Contract Soroban, nhà đầu tư góp vốn an toàn, nhận lợi tức thực tế và kiểm soát rủi ro thông qua dữ liệu thời tiết Oracle thời gian thực.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={onExplore}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-emerald-100 transition-all active:scale-95"
            >
              Xem Dự Án Đang Gom Vốn
            </button>
            <button
              onClick={onFarmerCreate}
              className="bg-white hover:bg-slate-50 text-slate-800 font-medium text-base px-6 py-3.5 rounded-2xl border border-slate-200 shadow-sm transition-all active:scale-95"
            >
              Dành Cho Nông Dân
            </button>
          </div>
        </div>

        {/* Hero Visual Right Stage */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-100 to-amber-100 rounded-[3rem] blur-xl opacity-60 -z-10" />
          <div className="bg-white/80 border border-slate-100 rounded-[2.5rem] p-6 shadow-xl backdrop-blur-md space-y-6">
            <img
              src="https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800&auto=format&fit=crop"
              alt="Vietnamese Agriculture RWA"
              className="w-full h-56 object-cover rounded-3xl"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-50">
                <span className="text-xs text-emerald-700 font-medium">Bảo chứng</span>
                <p className="text-sm font-bold text-slate-900 mt-1">Smart Contract 2.0</p>
              </div>
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-50">
                <span className="text-xs text-amber-700 font-medium">Chia sẻ lợi ích</span>
                <p className="text-sm font-bold text-slate-900 mt-1">Hợp tác minh bạch</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Statistics Grid */}
      <section className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-8">
          Số Liệu Đồng Bộ Mạng Stellar Hôm Nay
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="space-y-1 text-center md:text-left md:pl-4">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-500 text-sm">
              <Coins className="size-4 text-emerald-600" />
              <span>Tổng RWA Đã Đúc</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-950">
              ${stats.totalHuyDong.toLocaleString()}
            </p>
            <p className="text-xs text-emerald-600 font-medium">USD bảo hoàn on-chain</p>
          </div>

          <div className="space-y-1 text-center md:text-left md:pl-8 pt-6 md:pt-0">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-500 text-sm">
              <Landmark className="size-4 text-emerald-600" />
              <span>Dự Án Đang Chạy</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-950">
              {stats.soDuAn}
            </p>
            <p className="text-xs text-indigo-600 font-medium">Khu canh tác chất lượng</p>
          </div>

          <div className="space-y-1 text-center md:text-left md:pl-8 pt-6 md:pt-0">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-500 text-sm">
              <User className="size-4 text-emerald-600" />
              <span>Nhà Vườn Hợp Tác</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-950">
              {stats.nongDanThamGia}
            </p>
            <p className="text-xs text-amber-600 font-medium">Giao dịch đúc RWA trực tiếp</p>
          </div>

          <div className="space-y-1 text-center md:text-left md:pl-8 pt-6 md:pt-0">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-500 text-sm">
              <Sprout className="size-4 text-emerald-600" />
              <span>Sản Lượng Cam Kết</span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-950">
              {stats.sanLuongCamKet} Tấn
            </p>
            <p className="text-xs text-slate-500 font-medium">Lúa, cà phê, sầu riêng</p>
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
          <div className="size-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
            <TrendingUp className="size-5" />
          </div>
          <h4 className="font-bold text-slate-900">Mô hình Lợi tức Thực (Real-Yield)</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Nguồn lợi tức không dựa vào token giả định hay lạm phát, mà trực tiếp từ phần trăm sản phẩm vụ mùa thực tế của Hợp tác xã sau thu hoạch.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
          <div className="size-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
            <Handshake className="size-5" />
          </div>
          <h4 className="font-bold text-slate-900">Tính cơ động & Thanh khoản</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Các khoản đầu tư được mã hóa dưới dạng tiêu chuẩn RWA. Nhà đầu tư có thể chuyển giao, thế chấp hoặc thoát vị thế sớm thông qua giao dịch thứ cấp trên Stellar DEX.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
          <div className="size-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
            <ShieldCheck className="size-5" />
          </div>
          <h4 className="font-bold text-slate-900">Thú vị hơn với Oracle thực tế</h4>
          <p className="text-slate-500 text-sm leading-relaxed">
            Truy xuất dữ liệu điều kiện canh tác tự động. Hãy thử qua bảng điều khiển Oracle để giả lập bão lũ nhằm kiểm nghiệm độ tin cậy của phản ứng khẩn cấp!
          </p>
        </div>
      </div>
    </div>
  );
}

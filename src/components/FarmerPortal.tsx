import React, { useState } from "react";
import { Project } from "../types";
import { Sprout, ShieldAlert, CheckCircle, ArrowRight, Landmark, Upload } from "lucide-react";

interface FarmerPortalProps {
  projects: Project[];
  onMintProject: (newProj: Partial<Project>) => Promise<void>;
}

export default function FarmerPortal({ projects, onMintProject }: FarmerPortalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Cái Bè, Tiền Giang, Việt Nam");
  const [cropType, setCropType] = useState("Xoài Cát Hòa Lộc");
  const [fundingTarget, setFundingTarget] = useState("15000");
  const [expectedRoi, setExpectedRoi] = useState("12.5");
  const [area, setArea] = useState("5");
  const [expectedYield, setExpectedYield] = useState("30");
  const [duration, setDuration] = useState("6");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1553279768-865147edd380?q=80&w=800&auto=format&fit=crop");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert("Vui lòng nhập tên dự án!");
      return;
    }
    setSubmitting(true);
    try {
      await onMintProject({
        title,
        description,
        location,
        cropType,
        fundingTarget: parseFloat(fundingTarget),
        expectedRoi: parseFloat(expectedRoi),
        area: parseFloat(area),
        expectedYield: parseFloat(expectedYield),
        duration: parseInt(duration),
        imageUrl,
      });
      // Clear form
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectCrop = (crop: string) => {
    setCropType(crop);
    if (crop === "Sầu riêng Ri6") {
      setExpectedRoi("16.0");
      setFundingTarget("35000");
      setExpectedYield("70");
      setImageUrl("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop");
    } else if (crop === "Lúa ST25") {
      setExpectedRoi("11.5");
      setFundingTarget("12000");
      setExpectedYield("40");
      setImageUrl("https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800&auto=format&fit=crop");
    } else if (crop === "Cà phê Arabica") {
      setExpectedRoi("14.0");
      setFundingTarget("28000");
      setExpectedYield("55");
      setImageUrl("https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop");
    } else if (crop === "Xoài Cát Hòa Lộc") {
      setExpectedRoi("13.5");
      setFundingTarget("18000");
      setExpectedYield("45");
      setImageUrl("https://images.unsplash.com/photo-1553279768-865147edd380?q=80&w=800&auto=format&fit=crop");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-6 font-sans">
      {/* Introduction box for Agri-yield standard */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-emerald-900 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-md">
          <div className="size-12 bg-emerald-800 text-yellow-300 rounded-2xl flex items-center justify-center">
            <Sprout className="size-6" />
          </div>
          <div className="space-y-2">
            <h3 className="font-extrabold text-xl">Định Danh Số Nông Sản RWA Đích Thực</h3>
            <p className="text-emerald-100 text-xs sm:text-sm font-light leading-relaxed">
              Nhà vườn của hợp tác xã có vụ mùa sản lượng sạch và muốn tiếp cận vốn nước ngoài nhanh chóng thông qua decentralized pooling? Hãy tạo thông số vụ mùa chuẩn tại đây.
            </p>
          </div>

          <div className="space-y-4 pt-3 border-t border-emerald-800">
            <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-wider font-mono">Quy trình 3 bước đúc</h4>
            <ul className="space-y-3.5 text-xs text-emerald-105 font-mono">
              <li className="flex items-start gap-2.5">
                <span className="size-5 rounded-full bg-emerald-800 text-yellow-400 font-bold flex items-center justify-center text-[10px]">1</span>
                <span>Khai báo diện tích, sản lượng dự phóng và chỉ tiêu mục tiêu tiền tệ.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-5 rounded-full bg-emerald-800 text-yellow-400 font-bold flex items-center justify-center text-[10px]">2</span>
                <span>Ký giao dịch Freighter (Soroban Smart Contract) xác nhận quyền sở hữu.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-5 rounded-full bg-emerald-800 text-yellow-400 font-bold flex items-center justify-center text-[10px]">3</span>
                <span>Khởi động chiến dịch thu hút nhà đầu tư trên toàn thế giới.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Warning security checks */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-3xl p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-5 text-amber-700" />
            <h4 className="font-bold text-sm">Cảnh báo tính chính xác dữ liệu</h4>
          </div>
          <p className="text-slate-650 text-xs leading-relaxed">
            Mọi số liệu do bạn khai báo (Diện tích, cropType, Sản lượng cam kết) sẽ được đối soát chéo với dữ liệu bản đồ số không ảnh vệ tinh và các Trạm Oracle thẩm định địa phương. Gặp lỗi khai khống, Smart Contract sẽ tự động đình chỉ tháo khoản vay của bạn.
          </p>
        </div>
      </div>

      {/* Main Creation Form Column */}
      <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
          <Landmark className="size-5 text-emerald-600" />
          <span>Khai báo / Đúc RWA Vụ Mùa Mới</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Quick Crop Selector Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
              CHỌN LOẠI SẢN VỤ NÔNG SẢN
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Xoài Cát Hòa Lộc", "Sầu riêng Ri6", "Lúa ST25", "Cà phê Arabica"].map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => handleSelectCrop(c)}
                  className={`px-3 py-2 border rounded-xl text-xs font-medium text-center transition-all ${
                    cropType === c 
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-bold"
                      : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Tên Vụ Mùa RWA (Ví dụ: Dự án Cam bành...)</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Lúa Nàng Thơm Chợ Đào vụ Đông Xuân"
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Tỉnh thành canh tác</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Mô tả quy cách canh tác kỹ thuật</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Mô tả kỹ lưỡng cách tưới ẩm, bón phân chuẩn VietGAP để tăng độ uy tín với cộng đồng đầu tư."
              className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Vốn gọi (USDC)</label>
              <input
                type="number"
                required
                value={fundingTarget}
                onChange={(e) => setFundingTarget(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Lợi tức cam kết (%)</label>
              <input
                type="number"
                step="0.1"
                required
                value={expectedRoi}
                onChange={(e) => setExpectedRoi(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Diện tích (Hecta)</label>
              <input
                type="number"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Sản lượng (Tấn)</label>
              <input
                type="number"
                required
                value={expectedYield}
                onChange={(e) => setExpectedYield(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Độ dài vụ (Tháng)</label>
              <input
                type="number"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Ảnh đại diện nông sản (URL)</label>
              <input
                type="text"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:bg-slate-350"
            >
              <span>{submitting ? "Đang xử lý giao dịch..." : "Mint RWA Smart Contract"}</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

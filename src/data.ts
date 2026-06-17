import { Project } from "./types";

export const MOCK_STATS = {
  totalHuyDong: 1250000,
  soDuAn: 4,
  nongDanThamGia: 12,
  sanLuongCamKet: 450, // in tons
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-mango-hoaloc",
    title: "Xoài Cát Hòa Lộc Cái Bè (Thủy canh tuần hoàn)",
    description: "Hợp tác xã nông nghiệp công nghệ cao Cái Bè ứng dụng kỹ thuật bón phân tự động và cảm biến độ ẩm IoT để đảm bảo quả đồng đều kích thước, đạt chất lượng xuất khẩu sang EU.",
    location: "Cái Bè, Tiền Giang, Việt Nam",
    farmerName: "Hợp tác xã Cái Bè",
    cropType: "Xoài Cát Hòa Lộc",
    expectedRoi: 14.0,
    riskLevel: "Low",
    fundingTarget: 25000,
    fundingRaised: 18500,
    area: 5,
    expectedYield: 50, // tons
    duration: 6, // months
    imageUrl: "https://images.unsplash.com/photo-1553279768-865147edd380?q=80&w=800&auto=format&fit=crop",
    startDate: "2026-07-01",
    status: "Funding",
    investorsCount: 38,
    oracleWeather: {
      temperature: 31,
      humidity: 78,
      rainfallMm: 12.5,
      status: "Optimal",
      lastUpdated: "Cập nhật qua Oracle lúc 20:00",
    },
    oracleMarketPrice: {
      currentPrice: 2800, // per ton in USD equivalent
      unit: "Tấn",
      trend: "up",
      marketDemand: "High",
      lastUpdated: "Cập nhật sàn giao dịch AgriDEX",
    },
    updates: [
      {
        date: "2026-06-15",
        stage: "Thẩm định thổ nhưỡng",
        statusText: "Đã phê duyệt",
        description: "Hội đồng kỹ sư nông nghiệp thẩm định thành công nguồn nước và độ pH đất hữu cơ của vùng quy hoạch Cái Bè.",
      },
      {
        date: "2026-06-10",
        stage: "Khởi tạo on-chain",
        statusText: "Hợp đồng Smart Contract Soroban khả dụng",
        description: "Hợp đồng bảo chứng tài sản AgriYield đã khởi chạy thành công trên mạng Stellar Testnet.",
      }
    ],
  },
  {
    id: "proj-durian-ri6",
    title: "Sầu riêng Ri6 Chợ Lách (VietGAP chuẩn xuất khẩu)",
    description: "Vùng trồng sầu riêng Ri6 siêu sạch ứng dụng hệ thống tưới phun sương tự động điều khiển từ xa, tích hợp mã số vùng trồng tối đa hóa lợi tức nông sản xuất khẩu chính ngạch.",
    location: "Chợ Lách, Bến Tre, Việt Nam",
    farmerName: "Tổ hợp tác sầu riêng Chợ Lách",
    cropType: "Sầu riêng Ri6",
    expectedRoi: 16.5,
    riskLevel: "Medium",
    fundingTarget: 40000,
    fundingRaised: 39500,
    area: 8,
    expectedYield: 85,
    duration: 8,
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
    startDate: "2026-08-15",
    status: "Funding",
    investorsCount: 52,
    oracleWeather: {
      temperature: 30,
      humidity: 80,
      rainfallMm: 15.0,
      status: "Favorable",
      lastUpdated: "Cập nhật qua Oracle lúc 19:45",
    },
    oracleMarketPrice: {
      currentPrice: 4200,
      unit: "Tấn",
      trend: "stable",
      marketDemand: "High",
      lastUpdated: "Cập nhật sàn giao dịch AgriDEX",
    },
    updates: [
      {
        date: "2026-06-12",
        stage: "Kiểm định sầu riêng chiết cành",
        statusText: "Đạt chuẩn giống thuần",
        description: "Tiến hành ghép mắt chuẩn sinh học từ các cây mẹ đầu dòng khỏe mạnh nhất tỉnh Bến Tre.",
      }
    ],
  },
  {
    id: "proj-coffee-arabica",
    title: "Cà phê hữu cơ Arabica Khe Sanh (Chứng nhận RainForest)",
    description: "Nhà vườn tại Khe Sanh chuyển đổi mô hình từ canh tác truyền thống sang chuẩn cà phê nông lâm kết hợp, hạn chế tối đa thuốc trừ sâu hóa học, tạo hương vị đặc hữu chuẩn organic.",
    location: "Khe Sanh, Quảng Trị, Việt Nam",
    farmerName: "Hợp tác xã Cà phê Khe Sanh",
    cropType: "Cà phê Arabica",
    expectedRoi: 15.0,
    riskLevel: "Low",
    fundingTarget: 30000,
    fundingRaised: 30000,
    area: 12,
    expectedYield: 60,
    duration: 12,
    imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop",
    startDate: "2026-05-01",
    status: "Cultivating",
    investorsCount: 45,
    oracleWeather: {
      temperature: 24,
      humidity: 85,
      rainfallMm: 8.0,
      status: "Optimal",
      lastUpdated: "Cập nhật qua Oracle lúc 20:00",
    },
    oracleMarketPrice: {
      currentPrice: 3200,
      unit: "Tấn",
      trend: "up",
      marketDemand: "High",
      lastUpdated: "Cập nhật sàn giao dịch AgriDEX",
    },
    updates: [
      {
        date: "2026-06-01",
        stage: "Kiểm tra định kỳ sinh trưởng",
        statusText: "Sinh trưởng hoàn hảo",
        description: "Các chồi cà phê đang ra nhánh thứ tư đồng đều nhờ hệ số mưa phân bố lý tưởng.",
      },
      {
        date: "2026-05-01",
        stage: "Triển khai gieo hạt & ươm mầm",
        statusText: "Mở lớp đầu tư",
        description: "Cộng đồng đã hoàn thành 100% mục tiêu huy động 30,000 USD định danh RWA.",
      }
    ],
  },
  {
    id: "proj-rice-st25",
    title: "Lúa hữu cơ ST25 Sóc Trăng (Canh tác lúa - tôm)",
    description: "Mô hình luân canh 1 vụ lúa ST25 - 1 vụ tôm càng xanh sinh thái đạt chứng nhận quốc tế, giữ nguyên độ ngọt tự nhiên của đất phù sa hữu cơ mặn ngọt hài hòa.",
    location: "Mỹ Xuyên, Sóc Trăng, Việt Nam",
    farmerName: "Hộ nông dân Trần Văn Lúa",
    cropType: "Lúa ST25",
    expectedRoi: 12.0,
    riskLevel: "Low",
    fundingTarget: 15000,
    fundingRaised: 15000,
    area: 6,
    expectedYield: 45,
    duration: 5,
    imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=800&auto=format&fit=crop",
    startDate: "2026-02-10",
    status: "Harvested",
    investorsCount: 22,
    oracleWeather: {
      temperature: 32,
      humidity: 72,
      rainfallMm: 0.0,
      status: "Normal",
      lastUpdated: "Cập nhật qua Oracle lúc 18:00",
    },
    oracleMarketPrice: {
      currentPrice: 750,
      unit: "Tấn",
      trend: "stable",
      marketDemand: "Medium",
      lastUpdated: "Cập nhật sàn giao dịch AgriDEX",
    },
    updates: [
      {
        date: "2026-06-10",
        stage: "Thu hoạch vụ mùa",
        statusText: "Đã đóng gói kho nông sản",
        description: "Sản lượng đạt 46 tấn chất lượng gạo dẻo hạt dài nguyên chất, sẵn sàng tháo thanh khoản.",
      }
    ],
  }
];

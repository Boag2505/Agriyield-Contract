#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, token, Address, Env, Map, Symbol, Vec, log
};

/// Enum định nghĩa các trạng thái vòng đời của một dự án RWA nông nghiệp AgriYield.
#[contracttype]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum ProjectStatus {
    Funding = 0,     // Đang trong quá trình gọi vốn từ các nhà đầu tư
    Farming = 1,     // Đang tiến hành canh tác gieo trồng và chăm sóc nông sản
    Harvested = 2,   // Đã thu hoạch nông sản và chuẩn bị bán/thanh khoản sản lượng
    Distributed = 3, // Nông dân đã tất toán doanh thu và lợi nhuận được chia cho NĐT
}

/// Struct lưu trữ toàn bộ thông tin chi tiết của một dự án AgriYield.
#[contracttype]
#[derive(Clone, Debug)]
pub struct Project {
    pub id: u64,                    // ID duy nhất của dự án
    pub farmer: Address,            // Địa chỉ ví của người nông dân quản lý dự án
    pub target_amount: i128,        // Số vốn USDC mục tiêu cần gọi
    pub current_amount: i128,       // Số vốn USDC thực tế đã huy động được từ các nhà đầu tư
    pub status: ProjectStatus,      // Trạng thái hiện tại của dự án
    pub expected_yield_rate: u32,  // Tốc độ sinh lời dự kiến (Ví dụ: 1200 tức là 12.00% APR - quy đổi theo Basis Points)
}

/// Các Key để lưu trữ trạng thái của Smart Contract vào bộ nhớ persistent và instance của Soroban.
#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,                      // Địa chỉ của Quản trị viên hệ thống (Instance storage)
    UsdcToken,                  // Bộ điều khiển token USDC được dùng để đầu tư (Instance storage)
    ProjectCounter,             // Trình đếm tổng số dự án để tự tạo ID tăng dần (Instance storage)
    Project(u64),               // Lưu trữ một cấu trúc Project dựa theo Project ID (Persistent storage)
    InvestorList(u64),          // Danh sách các ví Address đã đầu tư vào Project cụ thể (Persistent storage)
    Investment(u64, Address),   // Số vốn USDC cụ thể một Ví đã góp cho một Project ID (Persistent storage)
}

/// Smart Contract AgriYield xử lý toàn bộ logic cho nền tảng huy động vốn cộng đồng RWA nông nghiệp.
#[contract]
pub struct AgriYieldContract;

#[contractimpl]
impl AgriYieldContract {

    /// 1. Hàm khởi tạo Contract
    /// Thiết lập địa chỉ Admin quản trị và địa chỉ của Token USDC dùng để giao dịch trên mạng Soroban.
    pub fn init(env: Env, admin: Address, usdc_token: Address) {
        // Chỉ cho phép khởi tạo một lần duy nhất
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Contract da duoc khoi tao truoc do!");
        }
        
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::UsdcToken, &usdc_token);
        env.storage().instance().set(&DataKey::ProjectCounter, &0u64);
        
        log!(&env, "AgriYield Contract duoc khoi tao thanh cong boi Admin: {}", admin);
    }

    /// 2. Hàm tạo dự án đầu tư nông nghiệp mới
    /// Cho phép nông dân tạo dự án RWA nông nghiệp để bắt đầu huy động vốn.
    /// Hàm này kiểm tra quyền xác thực ví của farmer bằng require_auth().
    pub fn create_project(
        env: Env, 
        farmer: Address, 
        target_amount: i128, 
        expected_yield_rate: u32
    ) -> u64 {
        // Kiểm tra quyền chữ ký của farmer
        farmer.require_auth();
        
        if target_amount <= 0 {
            panic!("So tien muc tieu phai lon hon 0");
        }

        // Lấy bộ đếm dự án hiện tại và tạo ID mới
        let mut counter: u64 = env.storage().instance().get(&DataKey::ProjectCounter).unwrap_or(0);
        counter += 1;
        env.storage().instance().set(&DataKey::ProjectCounter, &counter);

        // Khởi tạo cấu trúc dự án mới
        let new_project = Project {
            id: counter,
            farmer: farmer.clone(),
            target_amount,
            current_amount: 0,
            status: ProjectStatus::Funding,
            expected_yield_rate,
        };

        // Lưu trữ thông tin dự án vào Persistent Storage để tồn tại lâu dài
        env.storage().persistent().set(&DataKey::Project(counter), &new_project);
        
        // Khởi tạo danh sách nhà đầu tư trống cho dự án này
        let empty_investors: Vec<Address> = Vec::new(&env);
        env.storage().persistent().set(&DataKey::InvestorList(counter), &empty_investors);

        log!(&env, "Nong dan {} da tao du an moi voi ID: {} - Muc tieu: {} USDC", farmer, counter, target_amount);
        
        counter
    }

    /// 3. Hàm đầu tư vốn vào dự án nông nghiệp
    /// Nhà đầu tư nạp tiền USDC vào dự án đang ở trạng thái Funding.
    /// Smart Contract sẽ tự động gọi Token Client để chuyển USDC từ ví nhà đầu tư vào kho của Contract.
    pub fn invest(env: Env, investor: Address, project_id: u64, amount: i128) {
        // Xác minh danh tính và chữ ký giao dịch của nhà đầu tư
        investor.require_auth();

        if amount <= 0 {
            panic!("So tien dau tu phai lon hon 0");
        }

        // Truy xuất thông tin dự án từ Storage
        let mut project: Project = match env.storage().persistent().get(&DataKey::Project(project_id)) {
            Some(p) => p,
            None => panic!("Du an khong ton tai"),
        };

        // Ràng buộc trạng thái: Chỉ được đầu tư khi dự án đang trong pha Gọi vốn (Funding)
        if project.status != ProjectStatus::Funding {
            panic!("Du an hien khong o trong trang thai goi von");
        }

        // Đảm bảo tổng số tiền đầu tư không vượt quá số tiền mục tiêu của dự án (tránh overfunding quá mức)
        let total_after_investment = project.current_amount + amount;
        if total_after_investment > project.target_amount {
            panic!("So tien dau tu vuot qua gioi han can goi cua du an");
        }

        // Lấy thông tin Contract của đồng coin USDC đã cấu hình để tạo Token Client của Soroban
        let usdc_address: Address = env.storage().instance().get(&DataKey::UsdcToken).unwrap();
        let usdc_client = token::Client::new(&env, &usdc_address);

        // Thực hiện chuyển USDC trực tiếp từ ví NĐT vào địa chỉ quản lý của Contract này
        // (Bắt buộc người dùng phải duyệt cấp quyền phê duyệt/allowance hoặc trực tiếp ký giao dịch trên Stellar/Soroban)
        usdc_client.transfer(&investor, &env.current_contract_address(), &amount);

        // Cập nhật số tiền mà NĐT này đã đóng góp vào dự án
        let current_investment: i128 = env
            .storage()
            .persistent()
            .get(&DataKey::Investment(project_id, investor.clone()))
            .unwrap_or(0);
        let new_user_investment = current_investment + amount;
        env.storage().persistent().set(&DataKey::Investment(project_id, investor.clone()), &new_user_investment);

        // Đăng ký ví của NĐT vào danh sách cổ đông của dự án nếu họ chưa từng đầu tư trước đó
        let mut investors: Vec<Address> = env.storage().persistent().get(&DataKey::InvestorList(project_id)).unwrap();
        if !investors.contains(&investor) {
            investors.push_back(investor.clone());
            env.storage().persistent().set(&DataKey::InvestorList(project_id), &investors);
        }

        // Cập nhật tổng số vốn thực tế hiện tại của dự án
        project.current_amount = total_after_investment;

        // Nếu dự án đã đạt mục tiêu tài chính gọi vốn, tự động chuyển trạng thái sang Farming (Canh tác)
        if project.current_amount == project.target_amount {
            project.status = ProjectStatus::Farming;
            log!(&env, "Du an ID {} da dat 100% chi tieu goi von. Chuyen sang trang thai Canh Tac (Farming)!", project_id);
        }

        // Lưu thông tin dự án đã được cập nhật trở lại persistent storage
        env.storage().persistent().set(&DataKey::Project(project_id), &project);

        log!(&env, "Nha dau tu {} da gop {} USDC vao du an ID: {}", investor, amount, project_id);
    }

    /// 4. Hàm cập nhật trạng thái vụ mùa
    /// Cho phép thay đổi trạng thái của dự án nông nghiệp qua các giai đoạn khác nhau trong chu kỳ.
    /// Quyền hạn: Chỉ có Farmer đại diện dự án hoặc Admin quản trị hệ thống mới được phép gọi hàm này.
    pub fn update_status(env: Env, sender: Address, project_id: u64, new_status: ProjectStatus) {
        sender.require_auth();

        let mut project: Project = match env.storage().persistent().get(&DataKey::Project(project_id)) {
            Some(p) => p,
            None => panic!("Du an khong ton tai"),
        };

        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();

        // Kiểm tra quyền: Phải là Admin hoặc chính Farmer tạo ra dự án RWA này
        if sender != project.farmer && sender != admin {
            panic!("Ban khong co quyen cap nhat trang thai cho du an nay");
        }

        // Lưu trạng thái trước đó để log giám sát
        let old_status = project.status;
        project.status = new_status;
        
        env.storage().persistent().set(&DataKey::Project(project_id), &project);

        log!(
            &env, 
            "Du an ID {} duoc cap nhat boi {}. Trang thai tu {:?} sang {:?}", 
            project_id, sender, old_status, new_status
        );
    }

    /// 5. Hàm phân bổ giải ngân doanh thu & lợi nhuận vụ mùa (Yield Distribution)
    /// Khi đến mùa thu hoạch và nông sản được bán thành công, Farmer gọi hàm này để trả tiền ngược lại cho các nhà đầu tư.
    /// Farmer nộp tổng kết doanh thu (gồm cả gốc + lãi suất) vào Contract, contract tự động tính toán tỷ lệ vốn góp 
    /// của từng cổ đông và thực hiện phân chia chi tiết, minh bạch, chống gian lận.
    pub fn distribute_yield(env: Env, farmer: Address, project_id: u64, total_revenue: i128) {
        farmer.require_auth();

        if total_revenue <= 0 {
            panic!("Tong doanh thu phai lon hon 0");
        }

        // Kiểm tra dự án hợp lệ
        let mut project: Project = match env.storage().persistent().get(&DataKey::Project(project_id)) {
            Some(p) => p,
            None => panic!("Du an khong ton tai"),
        };

        // Đảm bảo người phân chia chính là Farmer phụ trách dự án
        if farmer != project.farmer {
            panic!("Chi nong dan phu trách du an moi co the phan bo loi nhuan");
        }

        // Dự án phải được kích hoạt hoặc đã thu hoạch để tránh phân phối nhầm
        if project.status == ProjectStatus::Distributed {
            panic!("Du an nay da tung duoc phan bo va tat toan loi nhuan truoc do");
        }

        // Lấy USDC token client để thực hiện các giao dịch token trực tiếp
        let usdc_address: Address = env.storage().instance().get(&DataKey::UsdcToken).unwrap();
        let usdc_client = token::Client::new(&env, &usdc_address);

        // Chuyển toàn bộ tiền doanh thu bán nông sản thực tế từ ví của Farmer vào contract để xử lý
        usdc_client.transfer(&farmer, &env.current_contract_address(), &total_revenue);

        // Lấy danh sách toàn bộ các địa chỉ ví nhà đầu tư đã góp tiền
        let investors: Vec<Address> = env.storage().persistent().get(&DataKey::InvestorList(project_id)).unwrap();
        let total_funded = project.current_amount;

        if total_funded <= 0 {
            panic!("Khong co nguon von nao duoc ghi nhan trong du an");
        }

        // Duyệt qua từng ví nhà đầu tư trong danh sách cổ đông
        for investor in investors.iter() {
            // Lấy số tiền nhà đầu tư này đã góp ban đầu
            let invested_amount: i128 = env
                .storage()
                .persistent()
                .get(&DataKey::Investment(project_id, investor.clone()))
                .unwrap_or(0);

            if invested_amount > 0 {
                // Công thức tính toán lợi nhuận được hưởng tỷ lệ thuận theo tỷ lệ đóng góp cổ phần:
                // Số tiền NĐT nhận về = (Số tiền NĐT đã góp * Tổng doanh thu) / Tổng số vốn thực tế huy động được.
                // Thực hiện phép nhân trước chia sau nhằm tối ưu hóa độ chính xác và tránh mất mát số dư (precision loss).
                let investor_share = (invested_amount * total_revenue) / total_funded;

                if investor_share > 0 {
                    // Chuyển trực tiếp số tiền chia sẻ cổ phần từ địa chỉ Contract đến ví của nhà đầu tư
                    usdc_client.transfer(&env.current_contract_address(), &investor, &investor_share);
                    log!(&env, "Da chuyen {} USDC ve vi nha dau tu: {}", investor_share, investor);
                }
            }
        }

        // Cập nhật trạng thái của dự án nông nghiệp sang trạng thái hoàn thành tất toán (Distributed)
        project.status = ProjectStatus::Distributed;
        env.storage().persistent().set(&DataKey::Project(project_id), &project);

        log!(
            &env, 
            "Du an ID {} da tat toan thanh cong! Nong dan {} da chia deu {} USDC doanh thu cho cac co dong.", 
            project_id, farmer, total_revenue
        );
    }

    /// ---- Các hàm phụ trợ (Read-only Getters) giúp Frontend kết nối và lấy thông tin ----

    /// Truy xuất thông tin chung của dự án theo ID
    pub fn get_project(env: Env, project_id: u64) -> Option<Project> {
        env.storage().persistent().get(&DataKey::Project(project_id))
    }

    /// Truy xuất tổng số dự án đã được tạo
    pub fn get_project_counter(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::ProjectCounter).unwrap_or(0)
    }

    /// Lấy danh sách tất cả các ví nhà đầu tư góp vốn cho dự án
    pub fn get_investors(env: Env, project_id: u64) -> Vec<Address> {
        env.storage().persistent().get(&DataKey::InvestorList(project_id)).unwrap_or_else(|| Vec::new(&env))
    }

    /// Kiểm tra số vốn góp của một ví cụ thể trong dự án
    pub fn get_investment(env: Env, project_id: u64, investor: Address) -> i128 {
        env.storage().persistent().get(&DataKey::Investment(project_id, investor)).unwrap_or(0)
    }

    /// Lấy địa chỉ Admin của Contract
    pub fn get_admin(env: Env) -> Option<Address> {
        env.storage().instance().get(&DataKey::Admin)
    }

    /// Lấy địa chỉ Token USDC được chấp nhận thanh toán
    pub fn get_usdc_token(env: Env) -> Option<Address> {
        env.storage().instance().get(&DataKey::UsdcToken)
    }
}

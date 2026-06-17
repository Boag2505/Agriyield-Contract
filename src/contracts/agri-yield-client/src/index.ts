import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CCVJ4BRXYF5R2QSN47FNAYAHKRX5ZESTSNMVR7UOVXHXLH7ICSJLQOAB",
  }
} as const

/**
 * Các Key để lưu trữ trạng thái của Smart Contract vào bộ nhớ persistent và instance của Soroban.
 */
export type DataKey = {tag: "Admin", values: void} | {tag: "UsdcToken", values: void} | {tag: "ProjectCounter", values: void} | {tag: "Project", values: readonly [u64]} | {tag: "InvestorList", values: readonly [u64]} | {tag: "Investment", values: readonly [u64, string]};


/**
 * Struct lưu trữ toàn bộ thông tin chi tiết của một dự án AgriYield.
 */
export interface Project {
  current_amount: i128;
  expected_yield_rate: u32;
  farmer: string;
  id: u64;
  status: ProjectStatus;
  target_amount: i128;
}

/**
 * Enum định nghĩa các trạng thái vòng đời của một dự án RWA nông nghiệp AgriYield.
 */
export enum ProjectStatus {
  Funding = 0,
  Farming = 1,
  Harvested = 2,
  Distributed = 3,
}

export interface Client {
  /**
   * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * 1. Hàm khởi tạo Contract
   * Thiết lập địa chỉ Admin quản trị và địa chỉ của Token USDC dùng để giao dịch trên mạng Soroban.
   */
  init: ({admin, usdc_token}: {admin: string, usdc_token: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a invest transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * 3. Hàm đầu tư vốn vào dự án nông nghiệp
   * Nhà đầu tư nạp tiền USDC vào dự án đang ở trạng thái Funding.
   * Smart Contract sẽ tự động gọi Token Client để chuyển USDC từ ví nhà đầu tư vào kho của Contract.
   */
  invest: ({investor, project_id, amount}: {investor: string, project_id: u64, amount: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Lấy địa chỉ Admin của Contract
   */
  get_admin: (options?: MethodOptions) => Promise<AssembledTransaction<Option<string>>>

  /**
   * Construct and simulate a get_project transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * ---- Các hàm phụ trợ (Read-only Getters) giúp Frontend kết nối và lấy thông tin ----
   * Truy xuất thông tin chung của dự án theo ID
   */
  get_project: ({project_id}: {project_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<Option<Project>>>

  /**
   * Construct and simulate a get_investors transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Lấy danh sách tất cả các ví nhà đầu tư góp vốn cho dự án
   */
  get_investors: ({project_id}: {project_id: u64}, options?: MethodOptions) => Promise<AssembledTransaction<Array<string>>>

  /**
   * Construct and simulate a update_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * 4. Hàm cập nhật trạng thái vụ mùa
   * Cho phép thay đổi trạng thái của dự án nông nghiệp qua các giai đoạn khác nhau trong chu kỳ.
   * Quyền hạn: Chỉ có Farmer đại diện dự án hoặc Admin quản trị hệ thống mới được phép gọi hàm này.
   */
  update_status: ({sender, project_id, new_status}: {sender: string, project_id: u64, new_status: ProjectStatus}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a create_project transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * 2. Hàm tạo dự án đầu tư nông nghiệp mới
   * Cho phép nông dân tạo dự án RWA nông nghiệp để bắt đầu huy động vốn.
   * Hàm này kiểm tra quyền xác thực ví của farmer bằng require_auth().
   */
  create_project: ({farmer, target_amount, expected_yield_rate}: {farmer: string, target_amount: i128, expected_yield_rate: u32}, options?: MethodOptions) => Promise<AssembledTransaction<u64>>

  /**
   * Construct and simulate a get_investment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Kiểm tra số vốn góp của một ví cụ thể trong dự án
   */
  get_investment: ({project_id, investor}: {project_id: u64, investor: string}, options?: MethodOptions) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a get_usdc_token transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Lấy địa chỉ Token USDC được chấp nhận thanh toán
   */
  get_usdc_token: (options?: MethodOptions) => Promise<AssembledTransaction<Option<string>>>

  /**
   * Construct and simulate a distribute_yield transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * 5. Hàm phân bổ giải ngân doanh thu & lợi nhuận vụ mùa (Yield Distribution)
   * Khi đến mùa thu hoạch và nông sản được bán thành công, Farmer gọi hàm này để trả tiền ngược lại cho các nhà đầu tư.
   * Farmer nộp tổng kết doanh thu (gồm cả gốc + lãi suất) vào Contract, contract tự động tính toán tỷ lệ vốn góp
   * của từng cổ đông và thực hiện phân chia chi tiết, minh bạch, chống gian lận.
   */
  distribute_yield: ({farmer, project_id, total_revenue}: {farmer: string, project_id: u64, total_revenue: i128}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_project_counter transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Truy xuất tổng số dự án đã được tạo
   */
  get_project_counter: (options?: MethodOptions) => Promise<AssembledTransaction<u64>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "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" ]),
      options
    )
  }
  public readonly fromJSON = {
    init: this.txFromJSON<null>,
        invest: this.txFromJSON<null>,
        get_admin: this.txFromJSON<Option<string>>,
        get_project: this.txFromJSON<Option<Project>>,
        get_investors: this.txFromJSON<Array<string>>,
        update_status: this.txFromJSON<null>,
        create_project: this.txFromJSON<u64>,
        get_investment: this.txFromJSON<i128>,
        get_usdc_token: this.txFromJSON<Option<string>>,
        distribute_yield: this.txFromJSON<null>,
        get_project_counter: this.txFromJSON<u64>
  }
}
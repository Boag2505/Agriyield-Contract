export const networks = {
  testnet: {
    networkPassphrase: 'Testnet Stellar Global Network ; October 2015',
    contractId: 'CC147RWANONGNGHIEPA92X',
  },
};

export class Client {
  options: any;
  rpcServer: any;

  constructor(options: any) {
    this.options = options;
    this.rpcServer = {
      sendTransaction: async (tx: any) => {
        console.log("Mocked sendTransaction called with:", tx);
        return { status: "SUCCESS", hash: "mock_tx_hash_" + Math.floor(Math.random() * 100000) };
      }
    };
  }

  async get_project_counter() {
    try {
      const saved = localStorage.getItem("agriyield_local_projects");
      if (saved) {
        const parsed = JSON.parse(saved);
        const onChainCount = parsed.filter((p: any) => !p.id.startsWith("temp-")).length;
        return BigInt(Math.max(onChainCount, 3));
      }
    } catch (e) {}
    return BigInt(3);
  }

  async get_project(args: { project_id: bigint }) {
    const idNum = Number(args.project_id);
    return {
      simulate: () => {
        const farmers = [
          "GBXVW3NBM5UX5O5O5O5O5O5O5O5O5O5O5O5O5O5O5O5O5O5O5O3D3",
          "GD76X2Z6W6NMW6NMW6NMW6NMW6NMW6NMW6NMW6NMW6NMW6NMW6NMS",
          "GA3D244N3V4N3V4N3V4N3V4N3V4N3V4N3V4N3V4N3V4N3V4N3V4NK",
        ];
        const farmer = farmers[(idNum - 1) % farmers.length];
        const targetAmountStr = String(15000 + (idNum * 5000) % 25000);
        const currentAmountStr = String(Math.floor(Number(targetAmountStr) * (idNum === 3 ? 1.0 : 0.6)));
        const statusNum = (idNum === 3) ? 2 : (idNum === 2) ? 1 : 0; // 0: Funding, 1: Cultivating, 2: Harvested
        const yieldRateStr = String(1200 + (idNum * 100) % 500); // 1200 is 12%, 1400 is 14%

        return {
          id: BigInt(idNum),
          target_amount: BigInt(targetAmountStr),
          current_amount: BigInt(currentAmountStr),
          status: BigInt(statusNum),
          expected_yield_rate: BigInt(yieldRateStr),
          farmer: farmer,
        };
      }
    };
  }

  async invest(args: { investor: string; project_id: bigint; amount: bigint }, opts: { publicKey: string }) {
    const self = this;
    return {
      toXDR: () => "AAAAAgAAAAB4YVj...",
      sign: async (signOpts: any) => {
        console.log("Mocked tx.sign for invest called");
        if (signOpts && typeof signOpts.signTransaction === 'function') {
          await signOpts.signTransaction("AAAAAgAAAAB4YVj...");
        }
      },
      send: async () => {
        return {
          status: "SUCCESS" as const,
          hash: "tx_hash_invest_" + Math.floor(Math.random() * 100000),
        };
      }
    };
  }

  async create_project(args: any, opts: { publicKey: string }) {
    return {
      toXDR: () => "AAAAAgAAAABcreate...",
      sign: async (signOpts: any) => {
        console.log("Mocked tx.sign for create_project called");
        if (signOpts && typeof signOpts.signTransaction === 'function') {
          await signOpts.signTransaction("AAAAAgAAAABcreate...");
        }
      },
      send: async () => {
        return {
          status: "SUCCESS" as const,
          hash: "tx_hash_create_" + Math.floor(Math.random() * 100000),
        };
      }
    };
  }
}

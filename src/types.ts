export interface ProjectUpdate {
  date: string;
  stage: string;
  statusText: string;
  description: string;
}

export interface OracleWeather {
  temperature: number;
  humidity: number;
  rainfallMm: number;
  status: "Normal" | "Warning" | "Optimal" | "Favorable";
  lastUpdated: string;
}

export interface OracleMarketPrice {
  currentPrice: number;
  unit: string;
  trend: "up" | "down" | "stable";
  marketDemand: "High" | "Medium" | "Low";
  lastUpdated: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  farmerName: string;
  cropType: string;
  expectedRoi: number;
  riskLevel: "Low" | "Medium" | "High";
  fundingTarget: number;
  fundingRaised: number;
  area: number;
  expectedYield: number;
  duration: number;
  imageUrl: string;
  startDate: string;
  status: "Funding" | "Cultivating" | "Harvested" | "Distributed";
  investorsCount: number;
  oracleWeather: OracleWeather;
  oracleMarketPrice: OracleMarketPrice;
  updates: ProjectUpdate[];
}

export interface UserWallet {
  connected: boolean;
  publicKey: string;
  balance: number;
}

export interface UserInvestment {
  id: string;
  projectId: string;
  projectTitle: string;
  amountInvested: number;
  expectedReturns: number;
  roi: number;
  date: string;
  status: "Funding" | "Cultivating" | "Harvested" | "Distributed" | string;
}

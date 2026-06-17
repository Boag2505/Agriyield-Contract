import React from "react";
import { UserWallet } from "../types";
import { Sprout, Wallet, Power, Menu, Globe } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  wallet: UserWallet;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  wallet,
  connectWallet,
  disconnectWallet,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setActiveTab("home")}
          >
            <span className="size-9 bg-emerald-600 text-yellow-300 rounded-xl flex items-center justify-center font-bold shadow-sm shadow-emerald-200 transition-all group-hover:scale-105">
              <Sprout className="size-5" />
            </span>
            <span className="font-sans font-black text-xl text-slate-800 tracking-tight">
              Agri<span className="text-emerald-600">Yield</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === "home"
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              Trang Chủ
            </button>
            <button
              onClick={() => setActiveTab("explore")}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === "explore"
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              Khám Phá RWA
            </button>
            <button
              onClick={() => setActiveTab("farmer")}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === "farmer"
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              Cổng Nông Dân
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === "dashboard"
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              Xem Đầu Tư
            </button>
          </nav>

          {/* Wallet Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-1 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 text-xs font-mono text-slate-500">
              <Globe className="size-3.5 text-emerald-600 animate-pulse" />
              <span>Soroban Testnet</span>
            </div>

            {wallet.connected ? (
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-1.5 py-1.5 text-sm">
                <div className="mr-3 font-mono text-slate-700">
                  <span className="font-bold text-slate-950">{(wallet.balance).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> XLM
                </div>
                <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-xl shadow-sm border border-slate-100 font-mono text-xs text-slate-600">
                  <span>{wallet.publicKey.slice(0, 4)}...{wallet.publicKey.slice(-4)}</span>
                  <button 
                    onClick={disconnectWallet}
                    className="p-1 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                    title="Ngắt kết nối Freighter"
                  >
                    <Power className="size-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <Wallet className="size-4" />
                <span>Kết Nối Freighter</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

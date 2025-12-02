// src/components/admin/AdminSidebar.jsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  ShoppingOutlined,
  FileSearchOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MediumOutlined,
  ProductOutlined,
  CodeSandboxOutlined
} from "@ant-design/icons";
import { usePathname } from "next/navigation";

const nav = [
  { key: "dashboard", label: "Dashboard", href: "/admin", icon: <DashboardOutlined /> },
  { key: "categories", label: "Categories", href: "/admin/categories", icon: <CodeSandboxOutlined /> },
  { key: "products", label: "Products", href: "/admin/products", icon: <ProductOutlined /> },
  { key: "users", label: "Users", href: "/admin/users", icon: <UsergroupAddOutlined /> },
  { key: "orders", label: "Orders", href: "/admin/orders", icon: <ShoppingOutlined /> },
  { key: "matrimonial", label: "Matrimonial", href: "/admin/matrimonial", icon: <MediumOutlined /> },
  { key: "reports", label: "Reports", href: "/admin/reports", icon: <FileSearchOutlined /> },
  { key: "settings", label: "Settings", href: "/admin/settings", icon: <SettingOutlined /> },
];

export default function AdminSidebar() {
  const pathname = usePathname() || "/admin";
  const parts = pathname.split("/").filter(Boolean);
  const active = parts[1] || "dashboard";

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("admin_sidebar_collapsed");
    if (saved) setCollapsed(saved === "1");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("admin_sidebar_collapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  return (
    // full-height sidebar card
    <aside className={`h-screen ${collapsed ? "w-20" : "w-64"} transition-all duration-200`}>
      <div className="h-full flex flex-col">
        <div className="bg-white  shadow-sm p-4 flex flex-col h-full">
          {/* top: brand + toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`${collapsed ? "w-8 h-8" : "w-10 h-10"} rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold`}>SV</div>
              {!collapsed && (
                <div>
                  <div className="text-lg font-semibold">SainVandeBharat</div>
                  <div className="text-xs text-gray-500">Admin Portal</div>
                </div>
              )}
            </div>

            <button
              onClick={() => setCollapsed((s) => !s)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="p-1 rounded-md hover:bg-gray-50 transition"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
          </div>

          {/* nav */}
          <nav className="flex-1 overflow-auto">
            <ul className="flex flex-col gap-2">
              {nav.map((item) => {
                const isActive = item.key === active;
                return (
                  <li key={item.key}>
                    <Link href={item.href} className="block">
                      <div
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 transition
                          ${isActive ? "bg-emerald-50 ring-1 ring-emerald-100" : "hover:bg-gray-50"}
                          ${collapsed ? "justify-center" : ""}`}
                      >
                        <div className={`${isActive ? "text-emerald-600" : "text-gray-700"}`}>{item.icon}</div>
                        {!collapsed && <span className={`text-sm ${isActive ? "text-emerald-700 font-medium" : "text-gray-700"}`}>{item.label}</span>}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* footer */}
          <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
            v1.0 • Admin
          </div>
        </div>
      </div>
    </aside>
  );
}

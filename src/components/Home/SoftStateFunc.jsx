import { Layout, Menu, Button, Input, Card, Avatar } from "antd";

function SoftCard({ title, desc }) {
  return (
    <Card className="rounded-2xl p-6 shadow-xs border-0 bg-white">
      <div className="h-12 w-12 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">✓</div>
      <h4 className="mt-4 text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-zinc-600">{desc}</p>
    </Card>
  );
}

function SoftStat({ label, value }) {
  return (
    <div className="p-3 bg-white rounded-lg shadow-xs border-0">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function SoftButton({ children, className, ...props }) {
  return (
    <button
      className={`rounded-lg px-4 py-2 text-sm font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export { SoftCard, SoftStat, SoftButton };
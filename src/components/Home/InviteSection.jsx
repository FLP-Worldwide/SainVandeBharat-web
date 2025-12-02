import { useState } from "react";

export default function InviteSection() {
  const [refCode, setRefCode] = useState("");

  const handleCopy = () => {
    const url = `${window.location.origin}/join?referredby=${refCode}`;
    navigator.clipboard.writeText(url);
    alert("Referral link copied!");
  };

  return (
    <section id="join" className="mt-16 rounded-2xl overflow-hidden border-0">
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-emerald-50 to-white rounded-xl">
        <div className="flex-1">
          <h4 className="text-2xl font-bold">Invite friends — earn rewards</h4>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300">
            Share your community link and get referral credits when friends join and shop.
            Grow your trusted circle.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Input
            placeholder="Your referral code"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
            className="rounded-lg bg-white"
          />
          <Button type="primary" onClick={handleCopy}>
            Copy Link
          </Button>
        </div>
      </div>
    </section>
  );
}
import { Input, Button } from "antd";
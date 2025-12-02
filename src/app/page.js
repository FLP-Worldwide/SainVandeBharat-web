
"use client";

import Image from "next/image";
import "antd/dist/reset.css";
import { Layout, Button, Card } from "antd";
const { Content } = Layout;
import Header from "@/components/Header";
import FooterPage from "@/components/Footer";
import HeroBanner from "@/components/Home/HeroBanner";
import { SoftCard } from "@/components/Home/SoftStateFunc";
import InviteSection from "@/components/Home/InviteSection";
import MatrimonialProfile from "@/components/Home/MatrimonialProfile";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans">
      <Layout className="min-h-screen">

          <Header />


        <Content className="mx-auto max-w-7xl px-6 py-16">
          {/* Hero */}
          
          <HeroBanner />

          {/* Features */}
          <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <SoftCard title="Community Hubs" desc="Create & manage groups, post events, and foster meaningful local connections." />
            <SoftCard title="Trusted Marketplace" desc="Buy & sell products crafted by community members with secure checkout." />
            <SoftCard title="Matrimonial Matches" desc="Search for matches filtered by community, values, and lifestyle preferences." />
          </section>

          {/* Shop preview */}
          <section id="shop" className="mt-16 hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Featured products</h2>
              <a href="#" className="text-sm hover:underline">View all</a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-white rounded-xl p-4 shadow-xs border-0">
                  <div className="h-40 w-full rounded-md bg-zinc-50 flex items-center justify-center overflow-hidden">
                    <img src={`/product-${i + 1}.jpg`} alt={`product-${i}`} className="object-cover w-full h-full" />
                  </div>
                  <div className="mt-3">
                    <div className="font-medium">Handmade Item #{i + 1}</div>
                    <div className="text-sm text-zinc-500">by Member #{i + 24}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="font-semibold">₹{(499 + i * 200).toLocaleString()}</div>
                      <Button size="small" type="primary" className="rounded-md">Buy</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Match / Matrimonial preview */}
          <MatrimonialProfile />

          {/* Callout: Referral & Invite */}
          <InviteSection />

          {/* Support / CTA */}
         <section
            id="support"
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white p-6 rounded-2xl shadow-xs border-0"
          >
            <div>
              <h4 className="text-2xl font-semibold">Support our mission</h4>
              <p className="text-zinc-600 dark:text-zinc-300 mt-2">
                Help us keep the platform free and community-driven. Donations go directly
                to platform improvements and community grants.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="primary">Donate</Button>
              {/* <Button>Learn more</Button> */}
            </div>
          </section>

        </Content>

        <FooterPage />
      </Layout>
    </div>
  );
}



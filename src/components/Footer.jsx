"use client";

import { Layout, Button, Input } from "antd";

import React from 'react'
const { Footer } = Layout;

export default function FooterPage() {
  return (
    <>
        <Footer className="bg-white/60 dark:bg-zinc-900/60 border-t border-transparent" style={{ padding: 2 }} >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-8">
            <div>
              <div className="text-xl font-bold">SainVandeBharat</div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Connecting communities, promoting local creators, and helping people find meaningful matches.</p>
            </div>

            <div className="flex gap-12">
              <div>
                <h5 className="font-semibold">Quick links</h5>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li><a href="#">Marketplace</a></li>
                  <li><a href="#">Matches</a></li>
                  <li><a href="#">Community Hubs</a></li>
                </ul>
              </div>

              <div>
                <h5 className="font-semibold">Contact</h5>
                <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>hello@sainvandebharat.example</li>
                  <li>+91 98765 43210</li>
                  <li>Office: Jaipur, Raj. India</li>
                </ul>
              </div>
            </div>

            <div>
              <h5 className="font-semibold">Stay updated</h5>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">Subscribe to our newsletter for community highlights and product drops.</p>
              <div className="mt-4 flex gap-2">
                <Input placeholder="Your email" className="rounded-lg bg-white flex-1" />
                <Button type="primary">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="bg-white/60 dark:bg-zinc-900/60 border-t border-transparent">
            <div className="max-w-7xl mx-auto px-6 py-2 text-sm text-zinc-600">
                © {new Date().getFullYear()} SainVandeBharat — Connecting communities
            </div>
            </div>


        </Footer>
        </>
  )
}

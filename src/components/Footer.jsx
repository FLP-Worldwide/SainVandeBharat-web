"use client";

import { Layout, Button, Input } from "antd";
import React from "react";
const { Footer } = Layout;

export default function FooterPage() {
  return (
    <>
      <Footer
        className="bg-white/60 dark:bg-zinc-900/60 border-t border-transparent"
        style={{ padding: 2 }}
      >

        {/* Download App Section */}
        <div className="max-w-7xl mx-auto px-6 pb-6">
          <div className="border border-transparent bg-white/70 dark:bg-zinc-900/70 rounded-xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">

            {/* Left Text */}
            <div>
              <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                Download Our App
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Stay connected with your community anytime, anywhere.
              </p>
            </div>

            {/* App Buttons */}
            <div className="flex items-center gap-6">
              {/* Play Store */}
              <a
                href="#"
                className="block overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700 hover:shadow-md transition"
                style={{ maxWidth: "150px" }}
              >
                <img
                  src="https://www.sammobile.com/wp-content/uploads/2023/12/Google-Play-Store.jpg"
                  alt="Download on Play Store"
                  className="w-full object-cover"
                />
              </a>

              {/* Coming Soon */}
              <div className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Googel Palystore — Coming Soon
              </div>
            </div>
          </div>
        </div>

        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-8">
          <div>
            <div className="text-xl font-bold">SainVandeBharat</div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Connecting communities, promoting local creators, and helping
              people find meaningful matches.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h5 className="font-semibold">Quick links</h5>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#">Marketplace</a>
                </li>
                <li>
                  <a href="#">Matches</a>
                </li>
                <li>
                  <a href="#">Community Hubs</a>
                </li>
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
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Subscribe to our newsletter for community highlights and product
              drops.
            </p>
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Your email"
                className="rounded-lg bg-white flex-1"
              />
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
  );
}

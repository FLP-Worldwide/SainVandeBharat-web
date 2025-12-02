import React from 'react'

import { Avatar, Button } from 'antd';
export default function MatrimonialProfile() {
  return (
    <>
    <section id="match" className="mt-16 bg-white p-6 rounded-2xl shadow-xs border-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Matrimonial Matches</h3>
              <a href="#" className="text-sm hover:underline">See detailed matches</a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="p-4 rounded-lg flex items-center gap-4 bg-zinc-50">
                  <Avatar size={64} src={`https://cdn-icons-png.freepik.com/512/6218/6218538.png`} />
                  <div>
                    <div className="font-semibold">Manoj Sain</div>
                    <div className="text-sm text-zinc-500">Community: Nai</div>
                    <div className="text-sm text-zinc-500">Age: {24 + idx}</div>
                  </div>
                  <div className="ml-auto">
                    <Button shape="round">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
  )
}

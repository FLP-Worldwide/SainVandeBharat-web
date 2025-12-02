import React from 'react'

import { Button, Card } from 'antd';
import {SoftStat} from '@/components/Home/SoftStateFunc';

export default function HeroBanner() {
  return (
    <>
    <section id="home" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">Build stronger bonds — find community, shop with trust, and match for life.</h1>
              <p className="text-zinc-600 dark:text-zinc-300 max-w-xl">SainVandeBharat is a safe, modern space for communities to come together: share events, buy products made by members, invite friends, and discover matrimonial matches tailored to your community preferences.</p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Button
                  type="primary"
                  size="large"
                  href="/join"
                >
                  Join the Community
                </Button>
                {/* <Button size="large" className="rounded-lg ">Browse Marketplace</Button> */}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 max-w-sm">
                <SoftStat label="Communities" value="+1,200" />
                <SoftStat label="Products" value="4,500" />
                <SoftStat label="Matches" value="8,700" />
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <Card className="w-full max-w-lg rounded-2xl shadow-xs border-0 overflow-hidden">
                <div className="relative rounded-xl">
                  <img src="https://media.istockphoto.com/id/1181218567/photo/close-up-top-view-of-young-people-putting-their-hands-together-indian-friends-with-stack-of.jpg?s=612x612&w=0&k=20&c=VNA4Rz4T8AzHIO5ldnWEH8WAFzFIebG-O4UhgFJLPAw=" alt="community" className="w-full h-64 object-cover rounded-lg" />
                </div>
              </Card>
            </div>
          </section>

    </>
  )
}

import Connections from '@/components/Connections'
import HeadTag from '@/components/HeadTag'
import LoggedNav from '@/components/LoggedNav'
import RightGrid from '@/components/RightGrid'
import React from 'react'

function mynetwork() {
  return (
    <div className='mynetwork min-h-screen'>
        <HeadTag title={"LinkedIn"}  />
        <LoggedNav />
        <div className="flex gap-5 sm:px-12">
            <div  className="post w-full sm:w-width70 bg-white">
                <h1 className='mt-3 ml-4'>295 Connections</h1>
                <hr className='hrline my-4' />
                <div className="mt-2">
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                <Connections />
                </div>
            </div>
            <RightGrid news={false} />
        </div>
    </div>
  )
}

export default mynetwork
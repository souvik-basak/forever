import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-xol sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchange_icon} alt="exchange" className='w-12 m-auto mb-5'/>
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policy.</p>
      </div>
      <div>
        <img src={assets.quality_icon} alt="shipping" className='w-12 m-auto mb-5'/>
        <p className='font-semibold'>7 days Return Policy</p>
        <p className='text-gray-400'>Free shipping on all orders over $99.</p>
      </div>
      <div>
        <img src={assets.support_img} alt="support" className='w-12 m-auto mb-5'/>
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We offer 24/7 customer support.</p>
      </div>
    </div>
  )
}

export default OurPolicy
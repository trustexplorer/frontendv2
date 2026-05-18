import React, { Suspense } from 'react'
import Forgotpass from '../../components/auth/forgotpass'

const page = () => {
  return (
    <div>
      
       <Suspense fallback={<div>Loading...</div>}>
        <Forgotpass />
        </Suspense>
    </div>
  )
}

export default page
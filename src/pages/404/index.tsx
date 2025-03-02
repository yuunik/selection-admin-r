import React from 'react'

const NotFoundPage: React.FC = () => {
  return (
    // <div className="container flex hidden flex-row overflow-hidden bg-slate-300">
    //   <div className="m-4 h-40 w-[220px] max-w-xs rounded-2xl border-4 border-black bg-[#fff] p-[10px] text-center text-3xl leading-3 font-black text-sky-600 shadow-lg shadow-black">
    //     div1
    //   </div>
    //   <div className="absolute top-100 left-100 z-10 h-25 w-25 rounded-2xl border-4 border-black bg-red-500">
    //     div2
    //   </div>
    //   <div>div3</div>
    //   <div>div4</div>
    // </div>
    <div className="bg container mx-auto grid h-100 w-100 translate-y-[50%] grid-cols-99 grid-rows-99 gap-4 bg-red-500">
      <div className="h-25 w-25 flex-1 bg-blue-500">div1</div>
      <div className="h-25 w-25 flex-1 bg-green-500">div2</div>
    </div>
  )
}

export default NotFoundPage

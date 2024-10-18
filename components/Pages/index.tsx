import Component, { PageEl } from '@/components/Libs/Component'
import Image from 'next/image'
import moment from "jalali-moment"


export default p => Component(p, Page);
const Page: PageEl = (props) => {

  const { price, diff24d, diff7d, diff30d } = props.data.data.currencies.USDT

  const m = moment()
  m.locale('fa')

  return (
    <main className="!font-serif bg-black flex flex-col min-h-screen p-8 text-white items-center">
      PIXEL<header
        className="flex items-center justify-between p-4 bg-[#222222] rounded-t-[14px]
    w-full max-w-[480px]"
      >

        <Image
          className="cursor-pointer"
          src="/menu-line.svg"
          alt="menu-line"
          width={20}
          height={20}
        />

        <Image
          className="pixel-logo"
          src="/pixel-logo.PNG"
          alt="pixel-logo"
          width={50}
          height={50}
        />
      </header>
      <section className="bg-[#222222] px-[3px] pb-[3px] relative -top-[2px] w-full max-w-[480px] rounded-b-[14px]">
        <div className="absolute !font-sans bg-[#222222] rounded-bl-xl p-2 text-xs -top-[1px] right-[2px]">
          {m.format('YYYY/MM/DD')}
        </div>
        <div className="bg-black rounded-xl min-h-[400px] px-7 pb-7">
          <div
            className="h-[200px] [background-image:url(/tether-logo.svg)] [background-position:center_75px] 
        pulse
         bg-no-repeat bg-contain "
          />
          <section
            className=" bg-[#222222] bg-opacity-70
         p-5 rounded-3xl border border-[#2c2c2c]"
          >
            <header className="text-xl font-bold mb-5 flex items-center justify-center">
              Tether Price: {(price ?? 0).toLocaleString()}
            </header>
            <div
              className="flex  items-center  justify-between flex-wrap"
              dir="ltr"
            >
              <div className="flex flex-col bg-[#222222] w-[108px] rounded-xl border text-center border-[#2c2c2c]">
                <div className="border-b border-b-[#2c2c2c] w-full py-2 font-medium">
                  Last 24H
                </div>
                <div className="py-4 font-medium text-lg">
                  {diff24d} <span className="text-[15px]">%</span>
                </div>
              </div>
              <div className="flex flex-col bg-[#222222] w-[108px] rounded-xl border text-center border-[#2c2c2c]">
                <div className="border-b border-b-[#2c2c2c] w-full py-2 font-medium">
                  Last 7D
                </div>
                <div className="py-4 font-medium text-lg">
                  {diff7d} <span className="text-[15px]">%</span>
                </div>
              </div>
              <div className="flex flex-col bg-[#222222] w-[108px] rounded-xl border text-center border-[#2c2c2c]">
                <div className="border-b border-b-[#2c2c2c] w-full py-2 font-medium">
                  Last 30D
                </div>
                <div className="py-4 font-medium text-lg">
                  {diff30d} <span className="text-[15px]">%</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        <center>
          Developed By Anita Sobhanian
        </center>
      </section>
    </main>
  )
}


export async function getServerSideProps() {
  let res = await fetch("https://api.tetherland.com/currencies")
  let data = await res.json()

  return {
    props: {
      data: global.QSON.stringify({ data })
    },
  }
}
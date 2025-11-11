export default function Dashboard() {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="bg-[linear-gradient(315deg,rgb(180,97,248)_0%,rgb(245,126,50)_100%)] w-full h-40  sm:w-1/3 flex flex-col border-2  rounded-2xl text-white shadow-lg">
          <div className="flex justify-start  mt-5 ml-7 text-lg font-semibold">
            LEADS
          </div>
          <div className="flex justify-end">
            <img
              src="https://dev-crm.spirehubs.com/static/media/lead-new.0c39ea01.gif"
              alt="lead"
              className="w-20 h-20"
            />
          </div>
          <div className="absolute text-5xl mt-20 ml-7 font-extrabold">6</div>
        </div>
        <div className=" bg-[linear-gradient(315deg,rgb(29,242,248)_0%,rgb(198,79,248)_100%)] w-full h-40  sm:w-1/3 flex flex-col border-2 rounded-2xl text-white shadow-lg">
          <div className="flex justify-start  mt-5 ml-7 text-lg font-semibold">
            CLIENTS
          </div>
          <div className="flex justify-end">
            <img
              src="https://dev-crm.spirehubs.com/static/media/client-new.dabad173.gif"
              alt="lead"
              className="w-20 h-20"
            />
          </div>
          <div className="absolute text-5xl mt-20 ml-7 font-extrabold">6</div>
        </div>
        <div className=" bg-[linear-gradient(315deg,rgb(0,144,64)_0%,rgb(46,223,2)_100%)] w-full h-40  sm:w-1/3 flex flex-col border-2 rounded-2xl text-white shadow-lg">
          <div className="flex justify-start  mt-5 ml-7 text-lg font-semibold">
            LEADS
          </div>
          <div className="flex justify-end">
            <img
              src="https://dev-crm.spirehubs.com/static/media/inquiry-new.b1f795ff.gif"
              alt="lead"
              className="w-20 h-20"
            />
          </div>
          <div className="absolute text-5xl mt-20 ml-7 font-extrabold">6</div>
        </div>
      </div>
    </>
  );
}

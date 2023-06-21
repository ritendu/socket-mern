
import { ThreeCircles } from "react-loader-spinner";

const Progress = ()=>{
   return (
    <div className="flex justify-center items-center h-[25rem]">
            <div>
            <ThreeCircles
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{margin:"0 auto"}}
  wrapperClass=""
  visible={true}
  ariaLabel="three-circles-rotating"
  outerCircleColor=""
  innerCircleColor=""
  middleCircleColor=""
/>
            </div>
        
        </div>
   )
}

export default Progress
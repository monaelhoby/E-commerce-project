import  Lottie from "lottie-react";

import empty from '@assets/lottieFile/empty.json'
import notFoundImg from '@assets/lottieFile/404.json'
import loadingImg from '@assets/lottieFile/loading.json'
import erroImg from '@assets/lottieFile/error.json'
import succededPlaceorder from '@assets/lottieFile/success.json'

const lottieFiles = {
    empty: empty,
    notFound: notFoundImg, 
    loading: loadingImg,
    error: erroImg,
    succededPlaceorder
}

type lottieHandlerProps = {
    type: keyof typeof lottieFiles,
    message?: string
}


const LottieHandler = ({type, message}: lottieHandlerProps) => {
 
    const lottieMap= lottieFiles[type]
  return (
      <div className="d-flex flex-column align-items-center">
      <Lottie animationData={lottieMap} style={{width: "200px",  height: "500px"}}/>
        <h3>{message}</h3>
      </div>
  );
};

export default LottieHandler
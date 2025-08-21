import Lottie from "lottie-react";
import SearchNotFound from "../../assets/NO RESULTS.json";

export const LottieAnimation = () => {
  return (
    <Lottie
      animationData={SearchNotFound}
      loop={true}
      autoplay={true}
      style={{ width: 200, height: 200 }}
    />
  );
};

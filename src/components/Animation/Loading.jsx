import Lottie from "lottie-react";
import loading from "../../assets/loading.json";

export const LottieAnimation = () => {
  return (
    <Lottie
      animationData={loading}
      loop={true}
      autoplay={true}
      style={{ width: 200, height: 200 }}
    />
  );
};

import { useState } from "react";
import SigninComponent from "./SigninComponent";
import SignupComponent from "./SignupComponent";

const Authentication = ({ close }: { close: () => void }) => {
  const [authModal, setAuthModal] = useState<string>("signin");

  return (
    <>
      {authModal === "signin" && (
        <SigninComponent close={close} setAuthModal={setAuthModal} />
      )}
      {authModal === "signup" && (
        <SignupComponent close={close} setAuthModal={setAuthModal} />
      )}
    </>
  );
};

export default Authentication;

import UpArrow from "@/components/svg/UpArrow";
import React from "react";
import clsx from "clsx";
import styles from "./style/footerSection.module.scss";
import ShareButton from "./ShareButton";

const FooterSection = ({ id, title }) => {
  const backToTopFun = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={clsx(styles.footerDiv)}>
      <div className={clsx(styles.backToTop)}>
        <button onClick={backToTopFun}>
          BACK TO TOP <UpArrow />
        </button>
      </div>
      <div>
        <ShareButton url={`${process.env.WEB}feed/${id}`} title={title} />
      </div>
    </div>
  );
};

export default FooterSection;

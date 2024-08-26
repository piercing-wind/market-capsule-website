import React from "react";
import clsx from "clsx";
import styles from "./style/feedBannerSection.module.scss";
import Image from "next/image";

const FeedBannerSection = ({ img = false, alt = false }) => {
  return (
    <div>
      <Image
        src={
          img ? img : "https://d1gg24sxbl1rgc.cloudfront.net/gst_f8d1df897b.png"
        }
        alt={alt ? alt : "feed banner"}
        width="1006"
        height="335"
        className={clsx("w-100 h-auto", styles.feedBannerImage)}
      />
    </div>
  );
};

export default FeedBannerSection;

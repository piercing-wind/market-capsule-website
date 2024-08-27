import React from "react";
import clsx from "clsx";
import styles from "./style/feedBannerSection.module.scss";
import dynamic from "next/dynamic";
const HeadingCom = dynamic(() =>
  import("@/components/Module/BannerSection/HeadingCom")
);
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import moment from "moment";
import FooterSection from "./FooterSection";

const Artical = ({
  id = "",
  title = "",
  createdAt = "",
  capsuleViewData = [],
  autherName = "John Doe",
}) => {
  return (
    <div className={clsx(styles.yelloBg)}>
      <h1 className={clsx(styles.h1Tag)}>{title}</h1>
      <p className={clsx(styles.create)}>
        Caption:<span>{moment(createdAt)?.format("DD MMM YYYY")}</span>
      </p>
      {/* <p className={clsx(styles.create)}>
        Author:<span>{autherName}</span>
      </p> */}
      {capsuleViewData?.length > 0 && (
        <BlocksRenderer
          blocks={{
            list: ({ children }) => (
              <ul className={clsx(styles.list)}>{children}</ul>
            ),
          }}
          content={capsuleViewData}
        />
      )}
      <FooterSection title={title} id={id} />
    </div>
  );
};

export default Artical;

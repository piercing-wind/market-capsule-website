import FacebookFeedIcon from "@/components/svg/FacebookFeedIcon";
import { FacebookIcon } from "@/components/svg/FacebookIcon";
import LinkIcon from "@/components/svg/LinkIcon";
import ShareIcon123 from "@/components/svg/ShareIcon";
import TwiterIcon from "@/components/svg/TwiterIcon";
import React from "react";
import toast from "react-hot-toast";
import { FiExternalLink } from "react-icons/fi";
import {
  FacebookShareButton,
  TwitterShareButton,
  //   EmailShareButton,
  //   FacebookIcon,
  //   TwitterIcon,
  //   EmailIcon,
} from "react-share";
import { RWebShare } from "react-web-share";
// import { RWebShare } from "react-web-share";
import styles from "./style/footerSection.module.scss";
import clsx from "clsx";
const ShareButton = ({ url, title }) => {
  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast.error("Failed to copy the link.");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        toast.success("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy the link.");
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <FacebookShareButton url={url} quote={title}>
        <FacebookFeedIcon />
      </FacebookShareButton>

      <button
        onClick={copyToClipboard}
        style={{ background: "none", border: "none" }}
      >
        <LinkIcon />
      </button>
      <span>
        <RWebShare
          data={{
            text: "",
            url: url,
            title: title,
          }}
          sites={[
            "facebook",
            "twitter",
            "whatsapp",
            "telegram",
            "linkedin",
            "mail",
            "copy",
          ]}
          //   disableNative={true}
          onClick={() => console.log("shared successfully!")}
        >
          <button className={clsx(styles.shareBtn)}>
            <ShareIcon123 />
          </button>
        </RWebShare>
      </span>

      <TwitterShareButton url={url} title={title}>
        <TwiterIcon />
      </TwitterShareButton>
    </div>
  );
};

export default ShareButton;

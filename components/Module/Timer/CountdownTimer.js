import { useState } from "react";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Trans, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import clsx from "clsx";
const CountdownTimer = ({
    minSecs,
    handleSubmit,
    label = "Resend OTP",
    resetValue,
    setResetValue,
}) => {
    const router = useRouter();
    const { minutes = 0, seconds = 60 } = minSecs;
    const { t } = useTranslation("common");
    const [[mins, secs], setTime] = useState([minutes, seconds]);
    const [trigger, setTrigger] = useState(false);
    const tick = () => {
        if (mins === 0 && secs === 0) {
            reset();
            setTrigger(true);
            if (resetValue === false) {
                setResetValue(true);
            }
        } else if (secs === 0) {
            setTime([mins - 1, 59]);
        } else {
            setTime([mins, secs - 1]);
        }
    };

    const reset = () => {
        setTime([parseInt(minutes), parseInt(seconds)]);
    };

    useEffect(() => {
        const timerId = setInterval(() => {
            tick();
        }, 1000);
        return () => clearInterval(timerId);
    }, [tick]);

    return (
        <div
            style={{
                fontSize: "16px",

                alignSelf: "center",
                display: "flex",
            }}
        >
            {trigger ? (
                <Button
                    style={{
                        border: "none",
                        outline: "none",
                        background: "none",
                        color: "#3E63FF",
                        fontSize: "16px",
                        cursor: "pointer",
                        fontWeight: "500",
                        padding: "0px",
                        textDecoration: "none"
                    }}
                    variant="link"
                    type="button"
                    onClick={() => {
                        setTrigger(false);
                        reset();
                        handleSubmit();
                        if (resetValue) {
                            setResetValue(false);
                        }
                    }}
                >
                    {label || t("profile.resendOtp")}
                </Button>
            ) : (
                <p
                    className={clsx(
                        router?.locale === "ar" ? "d-flex flex-row-reverse pr-1" : ""
                    )}
                    style={{ color: "#8C8C8C", fontSize: "16px", fontWeight: "500" }}
                >
                    {minutes && seconds ? (
                        `
            ${mins.toString().padStart(2, "0")}:${secs
                            .toString()
                            .padStart(2, "0")}`
                    ) : minutes ? (
                        `
              ${mins.toString().padStart(2, "0")}:${secs
                            .toString()
                            .padStart(2, "0")} ${router?.locale === "ar" ? t("otpVerifyPage.min") : "min"
                        }`
                    ) : (
                        <>
                            <span>{secs.toString().padStart(2, "0")}</span>

                            <span
                                className={clsx(router?.locale === "ar" ? " pr-1" : "pl-1")}
                            >
                                {router?.locale === "ar" ? t("otpVerifyPage.secs") : " secs"}
                            </span>
                        </>
                    )}
                </p>
            )}
        </div>
    );
};

export default CountdownTimer;

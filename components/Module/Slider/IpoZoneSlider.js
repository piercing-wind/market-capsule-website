import React from 'react';
import clsx from "clsx";
import styles from "./style/ipoZoneSlider.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import dynamic from 'next/dynamic';
import SliderRightIcon from '@/components/svg/SliderRightIcon';
import { Trans, useTranslation } from 'next-i18next';
const SearchResultCard = dynamic(() => import("../ScreenerCard/SearchResultCard"))

const IpoZoneSlider = ({ heading, sliderData, url }) => {
    const { t } = useTranslation("common")
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div className={clsx(className, styles.redColor)}>
                <div
                    className={clsx(styles.rightIcon)}
                    onClick={onClick}
                >
                    <SliderRightIcon />
                </div>

            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={clsx(className, styles.leftIcon)}
                onClick={onClick}
            >
                <SliderRightIcon />

            </div>
        );
    }
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: sliderData?.length > 2 ? 4 : 1,
        initialSlide: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: sliderData?.length > 2 ? 3 : 1,

                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: sliderData?.length > 2 ? 2 : 1,

                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ]
    };


    return (
        <div className={clsx(styles.hedingDiv)}>
            <h5>

                {sliderData?.length > 0 &&
                    t(heading)
                }

            </h5>
            <Slider {...settings} className={clsx("mainSlider")}>
                {
                    sliderData?.length > 0 ? (
                        sliderData?.map((el, index) => {
                            return (
                                <div key={index} className={clsx(styles.paddingRight12)}>

                                    <SearchResultCard
                                        dataObj={el}
                                        url={url}
                                    />
                                </div>

                            )

                        })

                    ) : null
                }

            </Slider>

        </div>
    )
}

export default IpoZoneSlider
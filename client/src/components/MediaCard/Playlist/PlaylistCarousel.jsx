import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MediaCardOverview } from '../MediaCardOverview';

const RESPONSIVE_CONFIG = {
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1,
  }
};

export const PlaylistCarousel = ({mediaList}) => {

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={RESPONSIVE_CONFIG}
      ssr={true}
      infinite={false}
      keyBoardControl={true}
      customTransition="all 1"
      transitionDuration={500}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {mediaList && mediaList.map(media => (
        <MediaCardOverview
          key={media?.id}
          title={media?.title}
          imageUrl={media?.imageUrl}
          mediaUrl={media?.mediaUrl}
          overview={media?.overview}
        />
      ))}
    </Carousel>
  );
};

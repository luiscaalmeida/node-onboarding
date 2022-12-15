import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MediaCardOverview } from '../MediaCardOverview';

const RESPONSIVE_CONFIG = {
  bigDesktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 4,
    slidesToSlide: 4,
  },
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

export const PlaylistCarousel = ({playlist, removeMedia}) => {
  const mediaList = playlist?.media_list;
  const playlistName = playlist?.name;

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
          playlistName={playlistName}
          removeMedia={() => {
            console.log(playlistName, media?.id);
            removeMedia.mutate([playlistName, media?.id]);
          }}
        />
      ))}
    </Carousel>
  );
};

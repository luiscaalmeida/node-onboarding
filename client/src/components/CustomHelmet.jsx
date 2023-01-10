import React from 'react';
import {Helmet} from 'react-helmet';

export const CustomHelmet = ({
  title, description, imageUrl,
}) => {

  return (
    <Helmet>
      <meta property="og:site_name" content={"IMDB.v2"} />
      <meta name="twitter:site" content={"IMDB.v2"} />
      <meta name="twitter:card" content={"summary_large_image"} />
      
      {title && <title>{title}</title>}
      {title && <meta property="og:title" content={title} />}
      {title && <meta name="twitter:title" content={title} />}

      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}

      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
    </Helmet>
  )
}

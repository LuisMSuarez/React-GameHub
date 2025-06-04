import noImage from "../assets/no-image-placeholder.webp"

const getOptimizedImage = (image_uri: string) => {
  if (!image_uri )
  {
    return noImage;
  }
  
  let rootIndex = image_uri.indexOf("/games/");
  // most images have a path like: https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg
  // and crop as: https://media.rawg.io/media/crop/600/400/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg
  if (rootIndex == -1)
  {
    // some images have this path: https://media.rawg.io/media/screenshots/6fe/6fe228662a253cd929cc78a103541ee0.jpg
    // they crop as: https://media.rawg.io/media/crop/600/400/screenshots/6fe/6fe228662a253cd929cc78a103541ee0.jpg
    rootIndex = image_uri.indexOf("/screenshots/");
  }
  
  const rootUri = image_uri.substring(0, rootIndex);
  const suffix = image_uri.substring(rootIndex, image_uri.length);
  const optimizedUri = rootUri + "/crop/600/400" + suffix;

  // note: there appears to be a different route available too: worth exploring as a todo item
  // https://media.rawg.io/media/resize/640/-/games/526/526881e0f5f8c1550e51df3801f96ea3.jpg
  return optimizedUri;
};

export default getOptimizedImage;


import sanityClient from './Sanity'
import { previewClient } from './Sanity';
import  imageUrlBuilder  from '@sanity/image-url';
 
const blogFields = `title,
subtitle,
slug,
image,
date,
'authorimage':authorimage->{title,'image':image.asset->url,date},
`
const builder = imageUrlBuilder(sanityClient);
 const getClient = preview => preview ? previewClient : sanityClient;
export function urlFor(source) {
  return builder.image(source);
    
  
}
 
export async function getAllBlogs({offset=0,date='desc'} = {offset :0,date:'desc'}) {

  const results = await sanityClient
    .fetch(`*[_type == "Blog"] | order(date ${date})  {${blogFields}}[${offset}...${offset+3}]`);
    return results;
}

export async function getBlogBySlug(slug,preview) {
  const currentClient =  getClient(preview)
  // console.log("preview",preview)
  // console.log("curcli", currentClient)
    const result = await currentClient
  // const result = await sanityClient
    .fetch(`*[_type == "Blog" &&  slug == $slug] {${blogFields} content[]{...,'asset':asset->}}`, { slug })
    .then(resp => preview? (resp?.[1]?resp?.[1]:resp?.[0]): resp?.[0])
  return result;
}

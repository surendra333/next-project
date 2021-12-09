import { getBlogBySlug } from 'lib/api';

export default async function enablePreview(req, res) {

  if (req.query.secret !== process.env.SANITY_STUDIO_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).json({message: 'Invalid token'})
    }

    const blog = await getBlogBySlug(req.query.slug);
    if (!blog) {
         return res.status(401).json({message: 'Invalid slug'})
    }
      // setPreviewData will set cookies into you browsert
  // __prerender_bypass __next_preview_data
    res.setPreviewData({message:'hello'});
    res.writeHead(307,{Location:`/blogs/${blog.slug}`})
    res.end();
   


}
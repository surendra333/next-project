
import BlockContent from '@sanity/block-content-to-react'
import HighlightCode from 'components/HighlightCode'
import { urlFor } from 'lib/api'

// const serializers = {
//     types: {
//         code: ({ node: { language, code, filename } }) => {
//             return <pre data-language={language}>
//                 <code>{code}</code>
//                 <p>{ filename}</p>
//             </pre>
//         }
//     }
// }

const serializers = {
    types: {
        code: ({ node: { language, code, filename } }) => {
            return (
                <HighlightCode className={language}>
                  <div className='code-filename'>{filename}</div>
                    {code}

                </HighlightCode>
            )
        },
        image: ({ node: { alt, asset, position = 'center' } }) => {
            
            // let style={}
            // if (position === 'left') {
            //     style.float = position;
            //     style.marginRight ='30px';
            // }
            //  if (position === 'right') {
            //      style.float = position;
            //     style.marginLeft = '30px';
            // }

            return (
                < div className={`blog-image blog-image-${position} `}>
                    <img src={urlFor(asset).height(300).fit('max')}  />
                    <div className='image-alt'>{ alt}</div>
                </div>
            )
            }
               
            
        }
    }

const BlogContent = ({ content }) => {
    
    return (
         <BlockContent  serializers={ serializers} blocks={ content}/>
    )
}
export default BlogContent;
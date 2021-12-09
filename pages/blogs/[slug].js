
import Pagelayout from "components/PageLayout"
import { getBlogBySlug,getAllBlogs } from "lib/api"
import BlogHeader from "components/BlogHeader";
import { Col, Row } from "react-bootstrap";
import BlogContent from "components/BlogContent";
import { urlFor } from "lib/api";
import PreviewAlert from "components/previewAlert";
import moment from 'moment';



const BlogDetail = ({ blog,preview }) => {
    console.log('Dispalying Page');
    
   

    return (
        <Pagelayout>
            <h1>Hello World - {blog?.slug}</h1>
        
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
              { preview && <PreviewAlert /> }
                    <BlogHeader title={blog.title} subtitle={blog.subtitle} image={urlFor(blog.image).height(500).url()} author={ blog.authorimage}     date={moment(blog.date).format('LLL')}/>
        <hr/>
                    {/* { Blog Content Here} */}
                  { blog.content &&
            <BlogContent content={blog.content} />
          } 
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </Col>
      </Row>
        </Pagelayout>
    )
}


export async function getStaticProps({ params,preview=false,previewData}) {
   // Todo: pass preview to getBlogBySlug and fetch draft blog
  console.log('preview', preview);
  console.log('previewData', previewData);
    const blog = await getBlogBySlug(params.slug,preview);
    return {
        props: {
        blog,
          preview
        }
    }
}
// TODO: Introduce fallback
export async function getStaticPaths() {
    console.log('Get paths for every page')
   
    const blogs = await getAllBlogs();
    const paths = blogs.map((b) => ({params:{slug:b.slug}})
      
        
    )
    
    return {
       paths,
     fallback:false    
    }

}


// export async function getServerSideProps({params}) {
//     const blog = await getBlogBySlug(params.slug);
//     return {
//         props: {
//             blog
//         }
//     }
// }
export default BlogDetail;
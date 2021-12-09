import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

import { Row, Col, Button } from 'react-bootstrap';
import PageLayout from 'components/PageLayout';
import Author from 'components/Author';
import FilteringMenu from 'components/FilteringMenu';
import CardItem from 'components/CardItem';
import CardListItem from 'components/CardListItem';
import { getAllBlogs } from 'lib/api';
import { useGetBlogs, useGetHello } from 'actions';
import useSWR from 'swr';
import PreviewAlert from 'components/previewAlert';
import { useGetBlogsPages } from 'actions/pagination';


export default function Home({blogs,preview}) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 }
  });
  
   // loadMore: to load more data
  // isLoadingMore: is true whenever we are making request to fetch data
  // isReachingEnd: is true when we loaded all of the data, data is empty (empty array)
 const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore
  } = useGetBlogsPages({blogs, filter});
 

  return (
    <PageLayout >
      {preview && <PreviewAlert/>}
      <Row>    
          <Col md="8">
          {/* AUTHOR INTRO STARTS */}
          <Author/>
            {/* AUTHOR INTRO ENDS */}
          </Col>
        
        </Row>
     
      <hr />

      <FilteringMenu filter={filter} onChange={(option, value) => setFilter({ ...filter, [option]: value })} />
      
    {/* className from props */}
    <div className={`page-wrapper`}>
        <Row className="mb-5">
          
          {/* {blogs?.map(blog =>
            filter.view.list ?
              <Col key={`${blog.slug}-list`} md="9">
                <CardListItem
                  author={blog.author}
                  title={blog.title}
                  subtitle={blog.subtitle}
                  date={blog.date}
                  link={{
                    href: '/blogs/[slug]',
                    as: `/blogs/${blog.slug}`
                  }}
                />
              </Col>
              :
              <Col key={blog.slug} md="4">
                <CardItem
                  author={blog.authorimage}
                  title={blog.title}
                  subtitle={blog.subtitle}
                  date={blog.date}
                  image={blog.image}
                  link={{
                    href: '/blogs/[slug]',
                    as: `/blogs/${blog.slug}`
                  }}
                />
              </Col>
          )} */}
          {pages}
         
        </Row>
        <div style={{textAlign: 'center'}}>
         <Button onClick={loadMore}
          disabled={isReachingEnd || isLoadingMore} size='lg' variant='outline-secondary'>{isLoadingMore ? '...' : isReachingEnd ? 'No more blogs' : 'More Blogs'}</Button>
         </div>
    </div>
 
  
 </PageLayout >
  )
}
 
// this function is called the build time
//fast
//it will create staic html document

export async function getStaticProps({preview=false}) {
  const blogs = await getAllBlogs({ offset: 0,date:'desc'});

  return {
    props: {
      blogs,
     preview
    }
  }
}
    
//   }
// }

// this funtion is slow,the time depend on fetch data
//it will work on runtime

// export async function getServerSideProps() {
//   const blogs = await getAllBlogs();
//  const randomNumber = Math.random();
//   return {
//     props: {
//       blogs,
//       randomNumber
//     }
    
    

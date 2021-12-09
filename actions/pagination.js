
import { useSWRPages } from 'swr';
import { useGetBlogs } from 'actions';
import CardItem from 'components/CardItem';
import CardListItem from 'components/CardListItem';
import { Col } from 'react-bootstrap';
import { useEffect } from 'react';
import CardItemBlank from 'components/CardItemBlank';
import CardListItemBlank from 'components/CardListItemBlank';
import moment from 'moment';


export const useGetBlogsPages = ({ blogs, filter }) => {
   useEffect(() => {
    window.__pagination__init = true;
  }, [])
    return useSWRPages(
    'index-page',
        ({ offset, withSWR }) => {
          let initialData = !offset && blogs;
    if (typeof window !== 'undefined' && window.__pagination__init) {
        initialData = null;
      }
          const { data: paginatedblogs } = withSWR(useGetBlogs({offset,filter},initialData));

            if (!paginatedblogs) {
                return Array(3)
          .fill(0)
         .map((_, i) =>
               filter.view.list ?
            <Col key={i} md="9">
              <CardListItemBlank />
                            </Col>
                            :
                <Col key={i} md="4">
              <CardItemBlank />
                            </Col>          
          )}

        return paginatedblogs?.map(blog =>
            filter.view.list ?
              <Col key={`${blog.slug}-list`} md="9">
                <CardListItem
                  author={blog.author}
                  title={blog.title}
                  subtitle={blog.subtitle}
                  date={moment(blog.date).format('LLL')}
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
                date={moment(blog.date).format('LLL')}
                  image={blog.image}
                  link={{
                    href: '/blogs/[slug]',
                    as: `/blogs/${blog.slug}`
                  }}
                />
              </Col>
          )
            
          
        
    },
    // here you will compute offset that will get passed into previous callback function with 'withSWR'
    // SWR: data you will get from 'withSWR' function
    // index: number of current page
    (SWR, index) => {
      if (SWR.data && SWR.data.length === 0) { return null; }
      return (index + 1) * 3;
    },
    [filter]
  )}
